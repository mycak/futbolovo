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

const LocalizationInput = ({
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const autocompleteElementRef = useRef<HTMLElement | null>(null);
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
    if (!containerRef.current) return;

    // Create PlaceAutocompleteElement
    const autocompleteElement = document.createElement(
      'gmp-place-autocomplete'
    ) as HTMLElement & {
      componentRestrictions?: { country: string };
      setAttribute: (name: string, value: string) => void;
    };

    // Set options
    if (lng === 'pl') {
      autocompleteElement.componentRestrictions = { country: 'pl' };
    }

    // Set placeholder if provided
    if (placeholder) {
      autocompleteElement.setAttribute('placeholder', placeholder);
    }

    // Apply custom styling to match the existing input style
    const inputElement = autocompleteElement.querySelector('input');
    if (inputElement) {
      inputElement.className = customStyles({ error: !!error });
    }

    // Add event listener for place selection
    autocompleteElement.addEventListener('gmp-placeselect', async (event) => {
      const customEvent = event as CustomEvent;
      const place = customEvent.detail?.place;
      if (place) {
        await place.fetchFields({
          fields: ['addressComponents', 'geometry', 'formattedAddress'],
        });
        handlePlaceChanged(place);
      }
    });

    // Append to container
    containerRef.current.appendChild(autocompleteElement);
    autocompleteElementRef.current = autocompleteElement;

    // Set display value if provided
    if (displayValue) {
      const inputElement = autocompleteElement.querySelector('input');
      if (inputElement) {
        inputElement.value = displayValue;
      }
    }

    // Cleanup
    return () => {
      if (autocompleteElementRef.current) {
        autocompleteElementRef.current.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChangeCallback(input);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const handlePlaceChanged = async (place: google.maps.places.Place) => {
    if (!place?.location) {
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

  const formData = (place: google.maps.places.Place) => {
    const addressComponents = place?.addressComponents;

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
          component.longText || '';
      }
    }

    const formattedAddress =
      `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
    
    // Handle both LatLng object and LatLngLiteral
    let latitude: number | undefined;
    let longitude: number | undefined;
    
    if (place?.location) {
      if (typeof place.location.lat === 'function') {
        latitude = place.location.lat();
        longitude = place.location.lng();
      } else {
        latitude = (place.location as google.maps.LatLngLiteral).lat;
        longitude = (place.location as google.maps.LatLngLiteral).lng;
      }
    }

    // Get input value from the autocomplete element
    const inputValue =
      (autocompleteElementRef.current as HTMLInputElement | null)?.value ||
      place.formattedAddress ||
      '';

    setInput((values) => ({
      ...values,
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: componentMap.postal_code,
      city: componentMap.administrative_area_level_2,
      state: componentMap.administrative_area_level_1,
      latitude,
      longitude,
      location: inputValue,
    }));
  };

  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>
        <div className='flex flex-row gap-2'>
          <div ref={containerRef} className='w-full' />
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

export default LocalizationInput;
