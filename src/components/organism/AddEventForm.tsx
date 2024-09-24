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
  FileInput,
  DateRangeInput,
  Button,
} from "@/components/atoms/";
import { zodResolver } from "@hookform/resolvers/zod";
import { descriptionHints } from "@/constants/addEvents";
import { ageCategoryOptions, categoryOptions } from "@/constants/inputOptions";
import { AddEventInputs, addEventSchema } from "@/schemas/addEventSchema";
import { EventCategoryEnum, LocationInputState } from "@/types/common";
import {
  Control,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";

const AddEventForm = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm<AddEventInputs>({ resolver: zodResolver(addEventSchema) });
  const currentCategory = watch("category");

  const onSubmit: SubmitHandler<AddEventInputs> = (data) => {
    console.log(data);
  };

  const onLocationChange = (data: LocationInputState) => {
    const { latitude, longitude } = data;
    if (!latitude || !longitude) return;
    setValue("coords", { latitude, longitude }, { shouldValidate: true });
  };

  const generateCategoryFieldsSet = () => {
    if (!currentCategory) return null;
    switch (currentCategory) {
      case EventCategoryEnum.TOURNAMENT:
        return (
          <>
            <DateInput
              name="date"
              label="Data"
              control={control as unknown as Control<FieldValues>}
              error={errors.date?.message}
              placeholder="Wybierz datę"
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
              error={errors.ageCategories?.message}
            />
          </>
        );
      case EventCategoryEnum.CAMP:
        return (
          <>
            <DateRangeInput
              name="dateRange"
              label="Zakres dat"
              placeholder="Wybierz daty"
              control={control as unknown as Control<FieldValues>}
              error={errors.dateRange?.message}
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
              error={errors.ageCategories?.message}
            />
          </>
        );
      case EventCategoryEnum.SCHOOL:
        return (
          <SelectInput
            control={control as unknown as Control<FieldValues>}
            label="Kategoria wiekowa"
            id="ageCategories"
            name="ageCategories"
            isMulti
            closeMenuOnSelect={false}
            placeholder="Wybierz"
            options={ageCategoryOptions}
            error={errors.image?.message}
          />
        );
    }
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
        error={errors.category?.message}
      />
      <LocalizationInput
        label="Lokalizacja"
        placeholder="Miasto, województwo, ulica"
        onChangeCallback={onLocationChange}
        error={errors.coords?.message}
      />
      <TextInput
        label="Nazwa"
        placeholder="Wpisz nazwę"
        name="name"
        register={register as unknown as UseFormRegister<FieldValues>}
        error={errors.name?.message}
      />
      {generateCategoryFieldsSet()}
      {/* CONTACT AND DESCRIPTION */}
      <NumberInput
        label="Cena"
        placeholder="Podaj kwotę / sezon"
        name="price"
        control={control as unknown as Control<FieldValues>}
        error={errors.price?.message}
      />
      <PhoneNumberInput
        label="Numer kontaktowy"
        placeholder="+48XXXXXXXXX"
        name="phoneNumber"
        register={register as unknown as UseFormRegister<FieldValues>}
        error={errors.phoneNumber?.message}
      />
      <EmailInput
        label="Email"
        placeholder="Wpisz email"
        name="email"
        register={register as unknown as UseFormRegister<FieldValues>}
        error={errors.email?.message}
      />
      <FileInput
        label="Zdjęcie/grafika/logo"
        placeholder="Umieść zdjęcie lub grafikę"
        name="image"
        control={control as unknown as Control<FieldValues>}
        error={errors.image?.message}
      />
      <TextAreaInput
        label="Opis"
        placeholder={
          currentCategory ? descriptionHints[currentCategory] : "Dodaj opis"
        }
        name="description"
        error={errors.description?.message}
        register={register as unknown as UseFormRegister<FieldValues>}
      />
      {/* <CldUploadWidget
        uploadPreset="futbolovo-beta-v1"
        options={{
          sources: ["local"],
          multiple: false,
          maxImageFileSize: 4194304,
          minImageWidth: 424,
          minImageHeight: 600,
          // maxImageWidth: 2480,
          // maxImageHeight: 3508,
          // validateMaxWidthHeight: true,
          singleUploadAutoClose: false,
          cropping: true,
          croppingAspectRatio: 424 / 600,
          croppingShowDimensions: true,
          showSkipCropButton: false,
        }}
      >
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget> */}

      <Button
        classNames="h-[38px] mt-6 bg-grass-45 text-xl flex items-center pl-3 pr-5 opacity-90 transition-all duration-300 col-span-2 max-w-max mx-auto hover:opacity-100"
        variant="icon"
        icon="location-dot"
        text="Dodaj"
        type="submit"
      />
    </form>
  );
};

export default AddEventForm;
