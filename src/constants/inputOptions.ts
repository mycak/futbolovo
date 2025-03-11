import { TranslationFunction } from '@/app/i18n/types';
import { SelectOptions } from '@/types/common';
import { AgeCategoryCategoryEnum, EventCategoryEnum } from '@prisma/client';

export const categoryOptions = (t: TranslationFunction): SelectOptions => [
  { value: EventCategoryEnum.TOURNAMENT, label: t('tournament') },
  { value: EventCategoryEnum.SCHOOL, label: t('academyOrSchool') },
  { value: EventCategoryEnum.SPORT_FIELD, label: t('pitchOrIndoor') },
  { value: EventCategoryEnum.CAMP, label: t('camp') },
  { value: EventCategoryEnum.LEAGUE, label: t('league') },
  { value: EventCategoryEnum.SERVICE, label: t('service') },
  { value: EventCategoryEnum.MATCH, label: t('match') },
];

export const ageCategoryOptions: SelectOptions = (
  Object.keys(AgeCategoryCategoryEnum) as Array<
    keyof typeof AgeCategoryCategoryEnum
  >
).map((key) => ({
  value: AgeCategoryCategoryEnum[key],
  label: AgeCategoryCategoryEnum[key],
}));

export const currencyOptions = (): SelectOptions => [
  { value: 'zł', label: 'zł' },
  { value: 'EUR', label: 'EUR' },
  { value: '$', label: '$' },
];
