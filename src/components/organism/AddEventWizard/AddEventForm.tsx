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
  Divider,
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
import { useAddEventWizardStore } from "@/stores";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

const AddEventForm = () => {
  const nextStep = useAddEventWizardStore((state) => state.nextStep);
  const setAddData = useAddEventWizardStore((state) => state.setAddData);
  const addData = useAddEventWizardStore((state) => state.addData);
  const { lng } = useParams();
  const { t } = useTranslation(lng);

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm<AddEventInputs>({
    resolver: zodResolver(addEventSchema),
    defaultValues: addData,
  });
  const currentCategory = watch("category");

  const onSubmit: SubmitHandler<AddEventInputs> = (data) => {
    setAddData(data);
    nextStep();
  };

  const onLocationChange = (data: LocationInputState) => {
    const { latitude, longitude, location } = data;
    if (!latitude || !longitude) return;
    setValue(
      "location",
      { latitude, longitude, addressName: location },
      { shouldValidate: true }
    );
  };

  const generateCategoryFieldsSet = () => {
    if (!currentCategory) return null;
    switch (currentCategory) {
      case EventCategoryEnum.TOURNAMENT:
        return (
          <>
            <DateInput
              name="date"
              label={t("date")}
              control={control as unknown as Control<FieldValues>}
              error={errors.date?.message}
              placeholder={t("chooseDate")}
            />
            <SelectInput
              control={control as unknown as Control<FieldValues>}
              label={t("ageCategory")}
              id="ageCategories"
              name="ageCategories"
              isMulti
              closeMenuOnSelect={false}
              placeholder={t("choose")}
              options={ageCategoryOptions}
              error={errors.ageCategories?.message}
            />
          </>
        );
      case EventCategoryEnum.CAMP:
      case EventCategoryEnum.MATCH:
        return (
          <>
            <DateRangeInput
              name="dateRange"
              label={t("dateRange")}
              placeholder={t("chooseDates")}
              control={control as unknown as Control<FieldValues>}
              error={errors.dateRange?.message}
            />
            <SelectInput
              control={control as unknown as Control<FieldValues>}
              label={t("ageCategory")}
              id="ageCategories"
              name="ageCategories"
              isMulti
              closeMenuOnSelect={false}
              placeholder={t("choose")}
              options={ageCategoryOptions}
              error={errors.ageCategories?.message}
            />
          </>
        );
      case EventCategoryEnum.SCHOOL:
        return (
          <SelectInput
            control={control as unknown as Control<FieldValues>}
            label={t("ageCategory")}
            id="ageCategories"
            name="ageCategories"
            isMulti
            closeMenuOnSelect={false}
            placeholder={t("choose")}
            options={ageCategoryOptions}
            error={errors.image?.message}
          />
        );
    }
  };

  return (
    <>
      <Divider />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-8 justify-center max-w-max mx-auto mt-4 md:mt-8"
      >
        <SelectInput
          control={control as unknown as Control<FieldValues>}
          label={t("category")}
          id="category"
          name="category"
          closeMenuOnSelect={true}
          placeholder={t("chooseCategory")}
          options={categoryOptions(t)}
          error={errors.category?.message}
        />
        <LocalizationInput
          label={t("location")}
          placeholder={t("cityAndPlace")}
          onChangeCallback={onLocationChange}
          error={errors.location?.message}
          displayValue={addData?.location?.addressName}
        />
        <TextInput
          label={t("name")}
          placeholder={t("typeName")}
          name="name"
          register={register as unknown as UseFormRegister<FieldValues>}
          error={errors.name?.message}
        />
        {generateCategoryFieldsSet()}
        {/* CONTACT AND DESCRIPTION */}
        <NumberInput
          label={t("price")}
          placeholder={t("givePrice")}
          name="price"
          control={control as unknown as Control<FieldValues>}
          error={errors.price?.message}
        />
        <PhoneNumberInput
          label={t("contactNumber")}
          placeholder="+48XXXXXXXXX"
          name="phoneNumber"
          register={register as unknown as UseFormRegister<FieldValues>}
          error={errors.phoneNumber?.message}
        />
        <EmailInput
          label="Email"
          placeholder={t("typeEmail")}
          name="email"
          register={register as unknown as UseFormRegister<FieldValues>}
          error={errors.email?.message}
        />
        <FileInput
          label={t("imageInputLabel")}
          placeholder={t("imageInputPlaceholder")}
          name="image"
          type="image"
          control={control as unknown as Control<FieldValues>}
          error={errors.image?.message}
        />
        <TextAreaInput
          label={t("description")}
          placeholder={
            currentCategory
              ? descriptionHints(t)[currentCategory]
              : t("addDescription")
          }
          name="description"
          error={errors.description?.message}
          register={register as unknown as UseFormRegister<FieldValues>}
        />
        <Divider contained classNames="col-span-2" />

        <Button
          classNames="h-[38px] bg-grass-45 text-xl pl-3 pr-5 col-span-2 max-w-max mx-auto"
          variant="icon"
          icon="location-dot"
          text={t("add")}
          type="submit"
        />
      </form>
    </>
  );
};

export default AddEventForm;
