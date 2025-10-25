'use client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'react-datepicker/dist/react-datepicker.css';
import { ageCategoryOptions, categoryOptions } from '@/constants/inputOptions';

import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { LocationInputState, MapFilters } from '@/types/common';
import { paths } from '@/constants/paths';
import { useTranslation } from '@/app/i18n/client';
import { EventCategoryEnum } from '@prisma/client';
import { useFilters } from '@/hooks/useFilters';
import SelectInput from '../atoms/inputs/SelectInput';
import LocationInput from '../atoms/inputs/LocationInput';
import DateRangeInput from '../atoms/inputs/DateRangeInput';
import PageWrapper from '../atoms/PageWrapper';
import SearchInput from '../atoms/inputs/SearchInput';
import Button from '../atoms/Button';
import clsx from 'clsx';
import SwitchInput from '../atoms/inputs/SwitchInput';

const Filters = () => {
  const {
    filters,
    setFilters,
    updateUrlWithFilters,
    onResetFilters,
    lng,
    isResetButtonDisabled,
  } = useFilters();
  const { t } = useTranslation(lng as string);
  const { handleSubmit, control, setValue, register } = useForm<MapFilters>({
    values: filters,
  });
  const [dateRangeDisabled, setDateRangeDisabled] = useState<boolean>(false);

  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
  const [overflowHidden, setOverflowHidden] = useState<boolean>(false);

  const currentCategories = useWatch({ control, name: 'categories' });
  const startDate = useWatch({ control, name: 'startDate' });
  const endDate = useWatch({ control, name: 'endDate' });

  useEffect(() => {
    const rangeCategories: EventCategoryEnum[] = [
      EventCategoryEnum.TOURNAMENT,
      EventCategoryEnum.CAMP,
      EventCategoryEnum.MATCH,
    ];

    if (
      rangeCategories.some((rangeCategory) =>
        currentCategories?.map((item) => item).includes(rangeCategory)
      ) ||
      !currentCategories?.length
    ) {
      setDateRangeDisabled(false);
    } else {
      setDateRangeDisabled(true);
    }
  }, [currentCategories]);

  const onSubmit: SubmitHandler<MapFilters> = (data) => {
    setFilters(data);
    updateUrlWithFilters(data);
  };

  const onLocationChange = (data: LocationInputState) => {
    const { latitude, longitude } = data;
    setValue('coords', { latitude, longitude });
  };

  return (
    <PageWrapper classNames='mb-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center w-full'
      >
        <div className='flex flex-col items-center md:flex-row justify-center gap-x-8 gap-y-3 flex-wrap [&>*]:w-80'>
          <SelectInput
            control={control}
            label={t('category')}
            id='categories'
            name='categories'
            isMulti
            closeMenuOnSelect={false}
            placeholder={t('chooseCategory')}
            options={categoryOptions(t)}
          />

          <div
            style={
              {
                interpolateSize: 'allow-keywords',
              } as React.CSSProperties
            }
            className={clsx(
              'w-full flex gap-y-2 flex-col md:h-auto md:overflow-visible allow-keywords',
              'transition-[height] duration-500 ease-in-out',
              {
                'h-auto': showMoreFilters,
                'h-0': !showMoreFilters,
                'overflow-hidden': overflowHidden ? false : true,
                'md:contents [&>*]:w-80': !showMoreFilters,
              }
            )}
          >
            <div className='contents [&>*]:w-80'>
              <LocationInput
                label={t('location')}
                placeholder={t('cityAndPlace')}
                onChangeCallback={onLocationChange}
                currentCoords={filters.coords}
              />

              <div
                className={clsx('relative', dateRangeDisabled && 'opacity-80')}
              >
                <DateRangeInput
                  setValue={setValue}
                  startDate={startDate}
                  endDate={endDate}
                  label={t('dateRange')}
                  minDate
                  placeholder={t('choose')}
                  disabled={dateRangeDisabled}
                />
                {dateRangeDisabled && (
                  <p className='absolute top-16 text-xs text-grass-50'>
                    {t('rangeDisabledInfo')}
                  </p>
                )}
              </div>
              <div
                className={clsx(
                  'relative',
                  dateRangeDisabled && 'mt-3 md:mt-0'
                )}
              >
                <SelectInput
                  control={control}
                  label={t('ageCategory')}
                  id='ageCategories'
                  name='ageCategories'
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder={t('choose')}
                  options={ageCategoryOptions}
                />
              </div>
              <div className={clsx(dateRangeDisabled && 'md:mt-3 lg:mt-0')}>
                <SearchInput
                  label={t('search')}
                  placeholder={t('writePhrase')}
                  register={register}
                  name='search'
                />
              </div>
              <div className='block mx-auto mt-4 md:hidden'>
                <SwitchInput
                  label={t('female')}
                  name='female'
                  register={register}
                />
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowMoreFilters(!showMoreFilters);
              setTimeout(() => setOverflowHidden(!showMoreFilters), 50);
            }}
            classNames={clsx(
              showMoreFilters && 'mt-2',
              'md:hidden h-[26px] text-sm pl-3 pr-5 justify-around'
            )}
            color={!showMoreFilters ? 'bg-grass-45' : 'bg-red-500'}
            variant='icon'
            icon={showMoreFilters ? 'remove' : 'add'}
            text={showMoreFilters ? t('lessFilters') : t('moreFilters')}
            type='button'
          />
        </div>
        <div className='hidden mx-auto mt-4 md:block'>
          <SwitchInput label={t('female')} name='female' register={register} />
        </div>
        <div className='flex gap-4 mx-auto mt-6'>
          <Button
            classNames='h-[38px] text-xl pl-3 pr-5'
            color='bg-red-500'
            variant='icon'
            icon='add'
            text={t('add')}
            asLink
            href={paths.EventAdd}
          />
          <Button
            classNames='h-[38px] text-xl pl-3 pr-5'
            color='bg-grass-45'
            variant='icon'
            icon='search'
            text={t('search')}
            type='submit'
          />

          {!isResetButtonDisabled ? (
            <Button
              classNames='h-[38px] text-xl pl-3'
              variant='icon'
              color='bg-red-600'
              icon='rotate-left'
              text={t('reset')}
              type='button'
              onClick={onResetFilters}
            />
          ) : null}
        </div>
      </form>
    </PageWrapper>
  );
};

export default Filters;
