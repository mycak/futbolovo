'use client';
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
} from '@/components/atoms/';
import { zodResolver } from '@hookform/resolvers/zod';
import { descriptionHints } from '@/constants/addEvents';
import { ageCategoryOptions, categoryOptions } from '@/constants/inputOptions';
import { AddEventInputs, addEventSchema } from '@/schemas/addEventSchema';
import { LocationInputState } from '@/types/common';
import {
  Control,
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { useAddEventWizardStore } from '@/stores';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { EventCategoryEnum } from '@prisma/client';
import { useState } from 'react';
import Modal from '@/components/molecules/Modal';

const AddEventForm = () => {
  const nextStep = useAddEventWizardStore((state) => state.nextStep);
  const setAddData = useAddEventWizardStore((state) => state.setAddData);
  const addData = useAddEventWizardStore((state) => state.addData);

  const [isMultipleModalOpened, setIsMultipleModalOpened] =
    useState<boolean>(false);

  const { lng } = useParams();
  const { t } = useTranslation(lng as string);

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm<AddEventInputs>({
    resolver: zodResolver(addEventSchema(t)),
    defaultValues: addData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalLocations',
  });

  const currentCategory = useWatch({ control, name: 'category' });
  const startDate = useWatch({ control, name: 'startDate' });
  const endDate = useWatch({ control, name: 'endDate' });

  const onSubmit: SubmitHandler<AddEventInputs> = (data) => {
    setAddData({
      ...data,
      additionalLocations:
        data.additionalLocations?.filter(
          (item) => item.latitude && item.longitude
        ) ?? [],
    });
    nextStep();
  };

  const onAddMoreLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMultipleModalOpened(true);
  };
  const onAcceptLocationsModal = () => {
    setIsMultipleModalOpened(false);
  };

  const onLocationChange = (
    data: LocationInputState,
    key: keyof AddEventInputs
  ) => {
    const { latitude, longitude, location } = data;
    if (!latitude || !longitude) return;

    setValue(
      key,
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
              name='date'
              minDate
              label={t('date')}
              control={control as unknown as Control<FieldValues>}
              error={errors.date?.message}
              placeholder={t('chooseDate')}
            />
            <SelectInput
              control={control as unknown as Control<FieldValues>}
              label={t('ageCategory')}
              id='ageCategories'
              name='ageCategories'
              isMulti
              closeMenuOnSelect={false}
              placeholder={t('choose')}
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
              minDate
              startDate={startDate}
              endDate={endDate}
              label={t('dateRange')}
              placeholder={t('chooseDates')}
              error={errors.startDate?.message}
              setValue={setValue as unknown as UseFormSetValue<FieldValues>}
            />
            <SelectInput
              control={control as unknown as Control<FieldValues>}
              label={t('ageCategory')}
              id='ageCategories'
              name='ageCategories'
              isMulti
              closeMenuOnSelect={false}
              placeholder={t('choose')}
              options={ageCategoryOptions}
              error={errors.ageCategories?.message}
            />
          </>
        );
      case EventCategoryEnum.SCHOOL:
        return (
          <SelectInput
            control={control as unknown as Control<FieldValues>}
            label={t('ageCategory')}
            id='ageCategories'
            name='ageCategories'
            isMulti
            closeMenuOnSelect={false}
            placeholder={t('choose')}
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
        className='flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-8 justify-center max-w-max mx-auto mt-4 md:mt-8'
      >
        <SelectInput
          control={control as unknown as Control<FieldValues>}
          label={t('category')}
          id='category'
          name='category'
          closeMenuOnSelect={true}
          placeholder={t('chooseCategory')}
          options={categoryOptions(t)}
          error={errors.category?.message}
        />
        <LocalizationInput
          label={t('location')}
          placeholder={t('cityAndPlace')}
          onChangeCallback={(data) => onLocationChange(data, 'location')}
          error={errors.location?.message}
          displayValue={addData?.location?.addressName}
          multiple
          onAddMore={onAddMoreLocation}
        />
        <Modal
          isOpen={isMultipleModalOpened}
          onClose={() => setIsMultipleModalOpened(false)}
          title={t('addMoreLocations')}
          onAccept={onAcceptLocationsModal}
        >
          {fields.map((field, index) => (
            <div key={field.id} className='flex flex-col justify-center gap-2'>
              <LocalizationInput
                label={`${t('location')} ${index + 2}`}
                placeholder={t('cityAndPlace')}
                onChangeCallback={(data) =>
                  onLocationChange(
                    data,
                    `additionalLocations.${index}` as never
                  )
                }
                error={
                  errors.additionalLocations?.[index]?.addressName?.message
                }
                displayValue={field.addressName}
              />
              <button
                type='button'
                className='text-red-500'
                onClick={() => remove(index)}
              >
                {t('remove')}
              </button>
            </div>
          ))}
          <button
            type='button'
            className='text-grass-50 mx-auto'
            onClick={() =>
              append({ latitude: null, longitude: null, addressName: '' })
            }
          >
            <i className='fa-solid fa-plus mr-1' />
            {t('add')}
          </button>
        </Modal>
        <TextInput
          label={t('name')}
          placeholder={t('typeName')}
          name='name'
          register={register as unknown as UseFormRegister<FieldValues>}
          error={errors.name?.message}
        />
        {generateCategoryFieldsSet()}
        {/* CONTACT AND DESCRIPTION */}
        <NumberInput
          label={t('price')}
          placeholder={t('givePrice')}
          name='price'
          control={control as unknown as Control<FieldValues>}
          error={errors.price?.message}
        />
        <PhoneNumberInput
          label={t('contactNumber')}
          placeholder='+48XXXXXXXXX'
          name='phoneNumber'
          register={register as unknown as UseFormRegister<FieldValues>}
          error={errors.phoneNumber?.message}
        />
        <EmailInput
          label='Email'
          placeholder={t('typeEmail')}
          name='email'
          register={register as unknown as UseFormRegister<FieldValues>}
          error={errors.email?.message}
        />
        <FileInput
          label={t('imageInputLabel')}
          placeholder={t('imageInputPlaceholder')}
          name='image'
          type='image'
          control={control as unknown as Control<FieldValues>}
          error={errors.image?.message}
        />
        <TextAreaInput
          label={t('description')}
          placeholder={
            currentCategory
              ? descriptionHints(t)[currentCategory]
              : t('addDescription')
          }
          name='description'
          error={errors.description?.message}
          register={register as unknown as UseFormRegister<FieldValues>}
        />
        <Divider contained classNames='col-span-2' />

        <Button
          classNames='h-[38px] bg-grass-45 text-xl pl-3 pr-5 col-span-2 max-w-max mx-auto'
          variant='icon'
          icon='location-dot'
          text={t('add')}
          type='submit'
        />
      </form>
    </>
  );
};

export default AddEventForm;
