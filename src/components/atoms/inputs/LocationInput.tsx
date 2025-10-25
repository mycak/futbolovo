'use client';
import { LocationInputState } from '@/types/common';
import React, { useEffect, useState, useRef } from 'react';
import { customStyles } from './styles';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const initialInputState = {
  streetAddress: '',
  country: '',
  zipCode: '',
  city: '',
  state: '',
  location: '',
  latitude: undefined,
  longitude: undefined,
};

const LocationInput = ({
  label,
  multiple,
  placeholder,
  onChangeCallback,
  error,
  displayValue,
  currentCoords,
  onAddMore,
}: {
  label: string;
  multiple?: boolean;
  placeholder: string;
  onChangeCallback: (data: LocationInputState) => void;
  error?: string;
  displayValue?: string | null;
  currentCoords?:
    | {
        latitude: number | undefined;
        longitude: number | undefined;
      }
    | undefined;
  onAddMore?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [input, setInput] = useState<LocationInputState>(initialInputState);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { lng } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (!currentCoords) {
      setInput(initialInputState);
    }
    if (
      currentCoords?.latitude &&
      currentCoords?.longitude &&
      !input.location
    ) {
      getPlaceNameFromCoords(currentCoords.latitude, currentCoords.longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCoords]);

  useEffect(() => {
    const options = {
      ...(lng === 'pl' && { componentRestrictions: { country: 'pl' } }),
      fields: ['address_components', 'geometry'],
    };

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current as HTMLInputElement,
      options
    );
    autocomplete.addListener('place_changed', () =>
      handlePlaceChanged(autocomplete)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChangeCallback(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput((values) => ({ ...values, location: value }));
  };

  const handlePlaceChanged = async (
    address: google.maps.places.Autocomplete
  ) => {
    const place = address.getPlace();

    if (!place?.geometry) {
      setInput(initialInputState);
      return;
    }
    formData(place);
  };

  const getPlaceNameFromCoords = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        setInput((values) => ({
          ...values,
          location: results[0].formatted_address,
          latitude: lat,
          longitude: lng,
        }));
      } else {
        console.error('Geocoding failed: ' + status);
      }
    });
  };

  const formData = (data: google.maps.places.PlaceResult) => {
    const addressComponents = data?.address_components;

    const componentMap = {
      subPremise: '',
      premise: '',
      street_number: '',
      route: '',
      country: '',
      postal_code: '',
      administrative_area_level_2: '',
      administrative_area_level_1: '',
    };
    if (!addressComponents) return;
    for (const component of addressComponents) {
      const componentType = component.types[0];
      if (componentMap.hasOwnProperty(componentType)) {
        componentMap[componentType as keyof typeof componentMap] =
          component.long_name;
      }
    }

    const formattedAddress =
      `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
    const latitude = data?.geometry?.location?.lat();
    const longitude = data?.geometry?.location?.lng();

    setInput((values) => ({
      ...values,
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: componentMap.postal_code,
      city: componentMap.administrative_area_level_2,
      state: componentMap.administrative_area_level_1,
      latitude,
      longitude,
      location: inputRef.current?.value as string,
    }));
  };

  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>
        <div className='flex flex-row gap-2'>
          <input
            ref={inputRef}
            type='text'
            name='localization'
            className={customStyles({ error: !!error })}
            onChange={handleChange}
            value={input.location ? input.location : displayValue ?? ''}
            placeholder={placeholder}
          />
        </div>
      </label>
      {error && (
        <span className='absolute text-red-500 text-xs -bottom-4 right-0'>
          {error === 'Required' ? t('fieldIsRequired') : error}
        </span>
      )}
      {multiple && (
        <span className='absolute text-grass-50 text-sm bottom-10 right-0'>
          <button onClick={onAddMore}>
            <i className='fa-solid fa-plus mr-1' />
            {t('addMore')}
          </button>
        </span>
      )}
    </div>
  );
};

export default LocationInput;
