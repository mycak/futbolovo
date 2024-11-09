'use client';
import 'react-datepicker/dist/react-datepicker.css';
import { ageCategoryOptions, categoryOptions } from '@/constants/inputOptions';

import {
  SelectInput,
  LocalizationInput,
  SearchInput,
  DateRangeInput,
  PageWrapper,
  Button,
} from '../atoms';
import {
  Control,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { LocationInputState, MapFilters } from '@/types/common';
import { paths } from '@/constants/paths';
import { useEventsStore } from '@/stores';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { EventCategoryEnum } from '@prisma/client';

const Filters = () => {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const setFilters = useEventsStore((state) => state.setFilters);
  const filters = useEventsStore((state) => state.filters);
  const { handleSubmit, control, setValue, register } = useForm<MapFilters>({
    values: filters,
  });
  const [dateRangeDisabled, setDateRangeDisabled] = useState<boolean>(false);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategories]);

  const onSubmit: SubmitHandler<MapFilters> = (data) => setFilters(data);

  const onLocationChange = (data: LocationInputState) => {
    const { latitude, longitude } = data;
    setValue('coords', { latitude, longitude });
  };

  return (
    <PageWrapper classNames='mb-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center'
      >
        <div className='flex justify-center gap-x-8 gap-y-2 flex-wrap'>
          <SelectInput
            control={control as unknown as Control<FieldValues>}
            label={t('category')}
            id='categories'
            name='categories'
            isMulti
            closeMenuOnSelect={false}
            placeholder={t('chooseCategory')}
            options={categoryOptions(t)}
          />
          <LocalizationInput
            label={t('location')}
            placeholder={t('cityAndPlace')}
            onChangeCallback={onLocationChange}
            currentCoords={filters.coords}
          />

          <div className='relative'>
            <DateRangeInput
              setValue={setValue as unknown as UseFormRegister<FieldValues>}
              startDate={startDate}
              endDate={endDate}
              label={t('dateRange')}
              minDate
              placeholder={t('choose')}
              disabled={dateRangeDisabled}
            />
            {dateRangeDisabled && (
              <p className='absolute top-16 text-sm text-grass-50'>
                {t('rangeDisabledInfo')}
              </p>
            )}
          </div>
          <div className='relative'>
            <SelectInput
              control={control as unknown as Control<FieldValues>}
              label={t('ageCategory')}
              id='ageCategories'
              name='ageCategories'
              isMulti
              closeMenuOnSelect={false}
              placeholder={t('choose')}
              options={ageCategoryOptions}
            />
          </div>
          <SearchInput
            label={t('search')}
            placeholder={t('writePhrase')}
            register={register as unknown as UseFormRegister<FieldValues>}
            name='search'
          />
        </div>
        <div className='flex gap-4 mx-auto'>
          <Button
            classNames='h-[38px] mt-6 text-xl pl-3 pr-5 bg-red-400'
            variant='icon'
            icon='add'
            text={t('add')}
            asLink
            href={paths.EventAdd}
          />
          <Button
            classNames='h-[38px] mt-6 bg-grass-45 text-xl pl-3 pr-5'
            variant='icon'
            icon='search'
            text={t('search')}
            type='submit'
          />
        </div>
      </form>
    </PageWrapper>
  );
};

export default Filters;
