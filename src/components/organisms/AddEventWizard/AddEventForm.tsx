'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { descriptionHints } from '@/constants/addEvents';
import {
  ageCategoryOptions,
  categoryOptions,
  currencyOptions,
} from '@/constants/inputOptions';
import { AddEventInputs, addEventSchema } from '@/schemas/addEventSchema';
import { LocationInputState } from '@/types/common';
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
  Path,
} from 'react-hook-form';
import { useAddEventWizardStore } from '@/stores';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { EventCategoryEnum } from '@prisma/client';
import { useState } from 'react';
import Modal from '@/components/molecules/Modal';
import SelectInput from '@/components/atoms/inputs/SelectInput';
import Divider from '@/components/atoms/Divider';
import DateRangeInput from '@/components/atoms/inputs/DateRangeInput';
import LocalizationInput from '@/components/atoms/inputs/LocalizationInput';
import FileInput from '@/components/atoms/inputs/FileInput';
import EmailInput from '@/components/atoms/inputs/EmailInput';
import PhoneNumberInput from '@/components/atoms/inputs/PhoneNumberInput';
import NumberInput from '@/components/atoms/inputs/NumberInput';
import TextInput from '@/components/atoms/inputs/TextInput';
import Button from '@/components/atoms/Button';
import TextAreaInput from '@/components/atoms/inputs/TextAreaInput';
import DateInput from '@/components/atoms/inputs/DateInput';
import SwitchInput from '@/components/atoms/inputs/SwitchInput';
import { Trans } from 'react-i18next/TransWithoutContext';
import Link from 'next/link';
import { paths } from '@/constants/paths';
import { TFunction } from 'i18next';
import { parseOldToCurrentEventData } from '@/utils/common';
import { useSession } from 'next-auth/react';

const AddEventForm = () => {
  const { status, data } = useSession();
  const nextStep = useAddEventWizardStore((state) => state.nextStep);
  const clearTempData = useAddEventWizardStore((state) => state.clearTempData);
  const setAddData = useAddEventWizardStore((state) => state.setAddData);
  const addData = useAddEventWizardStore((state) => state.addData);
  const tempAddData = useAddEventWizardStore((state) => state.tempAddData);
  const isEditMode = !!addData?.id;
  const isSignedIn = status === 'authenticated';

  const [isMultipleModalOpened, setIsMultipleModalOpened] =
    useState<boolean>(false);
  const [isImagesModalOpened, setIsImagesModalOpened] =
    useState<boolean>(false);

  const currentFormData = parseOldToCurrentEventData(tempAddData ?? addData);
  const parsedFormData = {
    ...currentFormData,
    email:
      isSignedIn && !currentFormData?.email
        ? data.user.email
        : currentFormData?.email,
  };

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
    defaultValues: {
      ...parsedFormData,
      currency: currencyOptions[0].value,
      termsAccepted: true,
      images: parsedFormData?.images || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalLocations',
  });

  const currentImages = useWatch({ control, name: 'images' }) || [];

  const addImage = () => {
    const newImages = [...currentImages, ''];
    setValue('images', newImages);
  };

  const removeImageAtIndex = (index: number) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue('images', newImages);

    // Clean up sessionStorage for the removed image
    const filenameKey = `filename_images.${index}`;
    sessionStorage.removeItem(filenameKey);

    // Also clean up any higher-indexed items since array is being reordered
    for (let i = index + 1; i < currentImages.length; i++) {
      const higherIndexKey = `filename_images.${i}`;
      sessionStorage.removeItem(higherIndexKey);
    }
  };

  const currentCategory = useWatch({ control, name: 'category' });
  const currentCurrency = useWatch({ control, name: 'currency' });

  const startDate = useWatch({ control, name: 'startDate' });
  const endDate = useWatch({ control, name: 'endDate' });

  const onSubmit: SubmitHandler<AddEventInputs> = (data) => {
    setAddData({
      ...data,
      additionalLocations:
        data.additionalLocations?.filter(
          (item) => item.latitude && item.longitude
        ) ?? [],
      images: data.images?.filter((image) => image).slice(0, 2) ?? [],
      id: addData?.id,
    });

    clearTempData();
    nextStep();
  };

  const onAddMoreLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMultipleModalOpened(true);
  };
  const onAcceptLocationsModal = () => {
    setIsMultipleModalOpened(false);
  };

  const onAddMoreImages = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsImagesModalOpened(true);
  };
  const onAcceptImagesModal = () => {
    setIsImagesModalOpened(false);
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
              control={control}
              error={errors.date?.message}
              placeholder={t('chooseDate')}
            />
            <SelectInput
              control={control}
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
              setValue={setValue}
            />
            <SelectInput
              control={control}
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
            control={control}
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
        className='flex flex-col items-center md:items-start gap-4 md:grid md:grid-cols-[repeat(2,_minmax(auto,_320px))] md:gap-x-8 justify-center mx-auto mt-4 md:mt-8'
      >
        <SelectInput
          control={control}
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
          displayValue={
            tempAddData?.location?.addressName ?? addData?.location?.addressName
          }
          multiple={!isEditMode}
          onAddMore={onAddMoreLocation}
        />
        <Modal
          isOpen={isMultipleModalOpened}
          title={t('addMoreLocations')}
          onAccept={onAcceptLocationsModal}
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='flex flex-col justify-center gap-2 items-center'
            >
              <LocalizationInput
                label={`${t('location')} ${index + 2}`}
                placeholder={t('cityAndPlace')}
                onChangeCallback={(data) =>
                  onLocationChange(
                    data,
                    `additionalLocations.${index}` as keyof AddEventInputs
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
            className='text-grass-50 mr-auto max-w-max'
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
          register={register}
          error={errors.name?.message}
        />
        <PhoneNumberInput
          label={t('contactNumber')}
          placeholder='+48XXXXXXXXX'
          name='phoneNumber'
          register={register}
          error={errors.phoneNumber?.message}
        />
        <NumberInput
          label={`${t('priceFrom')} ${currentCurrency}`}
          placeholder={t('givePrice')}
          name='priceFrom'
          control={control}
          error={errors.priceFrom?.message}
        />
        <NumberInput
          label={`${t('priceTo')} ${currentCurrency}`}
          placeholder={t('givePrice')}
          name='priceTo'
          control={control}
          error={errors.priceTo?.message}
        />
        <SelectInput
          control={control}
          label={t('currency')}
          id='currency'
          name='currency'
          closeMenuOnSelect={true}
          placeholder={t('currency')}
          options={currencyOptions}
          error={errors.currency?.message}
        />
        {generateCategoryFieldsSet()}

        {/* CONTACT AND DESCRIPTION */}

        <EmailInput
          label='Email'
          placeholder={t('typeEmail')}
          name='email'
          register={register}
          error={errors.email?.message}
        />
        <div className='relative max-w-80 w-full'>
          <FileInput
            label={t('imageInputLabel')}
            placeholder={t('imageInputPlaceholder')}
            name='image'
            control={control}
            error={errors.image?.message}
          />
          <span className='absolute text-grass-50 text-sm bottom-10 right-0 cursor-pointer'>
            <button type='button' onClick={onAddMoreImages}>
              <i className='fa-solid fa-plus mr-1' />
              {t('addMoreImages')}
            </button>
          </span>
        </div>
        <Modal
          isOpen={isImagesModalOpened}
          title={t('addMoreImages')}
          onAccept={onAcceptImagesModal}
        >
          {currentImages.slice(1).map((imageUrl, index) => (
            <div
              key={index}
              className='flex flex-col justify-center gap-2 items-center'
            >
              <FileInput
                label={`${t('imageInputLabel')} ${index + 2}`}
                placeholder={t('imageInputPlaceholder')}
                name={`images.${index + 1}` as Path<AddEventInputs>}
                control={control}
                error={errors.images?.[index + 1]?.message}
              />
              <button
                type='button'
                className='text-red-500'
                onClick={() => removeImageAtIndex(index + 1)}
              >
                {t('remove')}
              </button>
            </div>
          ))}
          {currentImages.length < 3 && (
            <button
              type='button'
              className='text-grass-50 mr-auto max-w-max'
              onClick={addImage}
            >
              <i className='fa-solid fa-plus mr-1' />
              {t('add')}
            </button>
          )}
        </Modal>
        <TextAreaInput
          label={t('description')}
          placeholder={
            currentCategory
              ? descriptionHints(t)[currentCategory]
              : t('addDescription')
          }
          name='description'
          error={errors.description?.message}
          register={register}
        />
        {(currentCategory === EventCategoryEnum.TOURNAMENT ||
          currentCategory === EventCategoryEnum.SCHOOL) && (
          <SwitchInput
            label={t('female')}
            name='female'
            register={register}
            error={errors.female?.message}
          />
        )}
        <SwitchInput
          label={
            <Trans
              t={t as TFunction<'translation', undefined>}
              i18nKey='acceptTermsAndPrivacyLabel'
              components={{
                1: <Link className='text-grass-50' href={paths.Statute} />,
                2: (
                  <Link className='text-grass-50' href={paths.PrivacyPolicy} />
                ),
              }}
            >
              I accept
              <Link className='text-grass-50' href={paths.Statute}>
                terms
              </Link>{' '}
              i{' '}
              <Link className='text-grass-50' href={paths.PrivacyPolicy}>
                privacy policy
              </Link>
            </Trans>
          }
          name='termsAccepted'
          register={register}
          error={errors.termsAccepted?.message}
        />
        <Divider contained classNames='col-span-2 !my-3' />

        <Button
          classNames='h-[38px] text-xl pl-3 pr-5 col-span-2 max-w-max mx-auto'
          color='bg-grass-45'
          variant='icon'
          icon='location-dot'
          text={isEditMode ? t('edit') : t('add')}
          type='submit'
        />
      </form>
    </>
  );
};

export default AddEventForm;
