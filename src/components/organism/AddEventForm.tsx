"use client";
import {
  SelectInput,
  LocalizationInput,
  DateInput,
  TextInput,
  NumberInput,
  TextAreaInput,
  PhoneNumberInput,
  EmailInput,
} from "@/components/atoms/";
import { ageCategoryOptions, categoryOptions } from "@/constants/inputOptions";
import { EventCategoryEnum, LocationInputState } from "@/types/common";
import {
  Control,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

type AddEventInputs = {
  category: {
    value: EventCategoryEnum;
    label: string;
  };
  coords: {
    latitude: number | undefined;
    longitude: number | undefined;
  };
  //Tournament
  ageCategories?: {
    value: number;
    label: string;
  }[];
  dateRange?: [Date | null, Date | null];
  date?: Date | null;
  price?: number;
  description?: string;
  phoneNumber: string;
  email: string;
};

const AddEventForm = () => {
  const { handleSubmit, watch, control, setValue, register } =
    useForm<AddEventInputs>();
  const currentCategory = watch("category");

  const generateCategoryFieldsSet = () => {
    if (!currentCategory) return null;
    switch (currentCategory.value) {
      case EventCategoryEnum.TOURNAMENT:
        return (
          <>
            <DateInput
              name="date"
              label="Data"
              setValue={setValue as unknown as UseFormSetValue<FieldValues>}
            />
            <TextInput
              label="Nazwa turnieju"
              placeholder="Wpisz nazwę"
              name="tournamentName"
              register={register as unknown as UseFormRegister<FieldValues>}
            />
            <SelectInput
              control={control as unknown as Control<FieldValues>}
              label="Kategoria wiekowa"
              id="ageCategories"
              name="ageCategories"
              isMulti
              closeMenuOnSelect={false}
              placeholder="Wybierz"
              options={ageCategoryOptions}
            />
            <NumberInput
              label="Wpisowe"
              placeholder="Podaj kwotę"
              name="price"
              register={register as unknown as UseFormRegister<FieldValues>}
            />
          </>
        );
    }
  };

  const onSubmit: SubmitHandler<AddEventInputs> = (data) => console.log(data);

  const onLocationChange = (data: LocationInputState) => {
    const { latitude, longitude } = data;
    setValue("coords", { latitude, longitude });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-y-4 gap-x-8 justify-center max-w-max mx-auto mt-8"
    >
      <SelectInput
        control={control as unknown as Control<FieldValues>}
        label="Kategoria"
        id="category"
        name="category"
        closeMenuOnSelect={true}
        placeholder="Wybierz kategorię"
        options={categoryOptions}
      />
      <LocalizationInput
        label="Lokalizacja"
        placeholder="Miasto, województwo, ulica"
        onChangeCallback={onLocationChange}
      />
      {generateCategoryFieldsSet()}
      {/* CONTACT AND DESCRIPTION */}
      <PhoneNumberInput
        label="Numer kontaktowy"
        placeholder="+48XXXXXXXXX"
        name="phoneNumber"
        register={register as unknown as UseFormRegister<FieldValues>}
      />
      <EmailInput
        label="Email"
        placeholder="Wpisz email"
        name="email"
        register={register as unknown as UseFormRegister<FieldValues>}
      />
      <TextAreaInput
        label="Opis"
        placeholder="Dodaj opis"
        name="description"
        register={register as unknown as UseFormRegister<FieldValues>}
      />
    </form>
  );
};

export default AddEventForm;
