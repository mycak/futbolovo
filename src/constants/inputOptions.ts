import { TranslationFunction } from '@/app/i18n/types';
import { SelectOptions } from '@/types/common';
import { AgeCategoryCategoryEnum, EventCategoryEnum } from '@prisma/client';

export const categoryOptions = (t: TranslationFunction): SelectOptions => 
  typeof EventCategoryEnum !== 'undefined' ? [
    { value: EventCategoryEnum.TOURNAMENT, label: t('tournament') },
    { value: EventCategoryEnum.SCHOOL, label: t('academyOrSchool') },
    { value: EventCategoryEnum.SPORT_FIELD, label: t('pitchOrIndoor') },
    { value: EventCategoryEnum.CAMP, label: t('camp') },
    { value: EventCategoryEnum.LEAGUE, label: t('league') },
    { value: EventCategoryEnum.SERVICE, label: t('service') },
    { value: EventCategoryEnum.MATCH, label: t('match') },
  ] : [
    // Fallback options for when Prisma client is not available
    { value: 'TOURNAMENT', label: t('tournament') },
    { value: 'SCHOOL', label: t('academyOrSchool') },
    { value: 'SPORT_FIELD', label: t('pitchOrIndoor') },
    { value: 'CAMP', label: t('camp') },
    { value: 'LEAGUE', label: t('league') },
    { value: 'SERVICE', label: t('service') },
    { value: 'MATCH', label: t('match') },
  ];

export const ageCategoryOptions: SelectOptions = 
  typeof AgeCategoryCategoryEnum !== 'undefined' ? (
    Object.keys(AgeCategoryCategoryEnum) as Array<
      keyof typeof AgeCategoryCategoryEnum
    >
  ).map((key) => ({
    value: AgeCategoryCategoryEnum[key],
    label: AgeCategoryCategoryEnum[key],
  })) : [
    // Fallback options for when Prisma client is not available
    { value: 'OPEN', label: 'OPEN' },
    { value: 'OLDBOYS', label: 'OLDBOYS' },
    { value: 'VETERAN', label: 'VETERAN' },
    { value: 'U21', label: 'U21' },
    { value: 'U20', label: 'U20' },
    { value: 'U19', label: 'U19' },
    { value: 'U18', label: 'U18' },
    { value: 'U17', label: 'U17' },
    { value: 'U16', label: 'U16' },
    { value: 'U15', label: 'U15' },
  ];

export const currencyOptions: {
  value: string;
  label: string;
}[] = [
  { value: 'zł', label: 'zł' }, // Polish Zloty
  { value: '€', label: '€' }, // Euro
  { value: '$', label: '$' }, // US Dollar
  { value: '£', label: '£' }, // British Pound
  { value: '₺', label: '₺' }, // Turkish Lira
  { value: '₾', label: '₾' }, // Georgian Lari
  { value: '₴', label: '₴' }, // Ukrainian Hryvnia
  { value: 'лв', label: 'лв' }, // Bulgarian Lev
  { value: 'kr', label: 'kr' }, // Scandinavian Krona (DKK, NOK, SEK, ISK)
  { value: 'ден', label: 'ден' }, // Macedonian Denar
  { value: 'lei', label: 'lei' }, // Romanian Leu
  { value: 'Kč', label: 'Kč' }, // Czech Koruna
  { value: 'Ft', label: 'Ft' }, // Hungarian Forint
  { value: 'Fr', label: 'Fr' }, // Swiss Franc
];
