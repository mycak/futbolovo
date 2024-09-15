"use client";
import { LocationInputState } from "@/types/common";
import React, { useEffect, useState, useRef } from "react";

const initialInputState = {
  streetAddress: "",
  country: "",
  zipCode: "",
  city: "",
  state: "",
  location: "",
  latitude: undefined,
  longitude: undefined,
};

const LocalizationInput = ({
  label,
  placeholder,
  onChangeCallback,
}: {
  label: string;
  placeholder: string;
  onChangeCallback: (data: LocationInputState) => void;
}) => {
  const [input, setInput] = useState<LocationInputState>(initialInputState);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const options = {
      componentRestrictions: { country: "pl" },
      fields: ["address_components", "geometry"],
    };

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current as HTMLInputElement,
      options
    );
    autocomplete.addListener("place_changed", () =>
      handlePlaceChanged(autocomplete)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChangeCallback(input);
  }, [input, onChangeCallback]);

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

  const formData = (data: google.maps.places.PlaceResult) => {
    const addressComponents = data?.address_components;

    const componentMap = {
      subPremise: "",
      premise: "",
      street_number: "",
      route: "",
      country: "",
      postal_code: "",
      administrative_area_level_2: "",
      administrative_area_level_1: "",
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
    <div>
      <label className="flex flex-col">
        <span className="text-grass-20">{label}</span>
        <input
          ref={inputRef}
          type="text"
          name="localization"
          className="h-[38px] border border-grass-50 rounded-sm bg-emerald-900 w-80 p-1 pl-2 text-ivory-150 placeholder:text-ivory-150 hover:cursor-pointer hover:border-grass-40 active:outline-none focus:outline-none focus:border-grass-40"
          onChange={handleChange}
          value={input.location}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default LocalizationInput;
