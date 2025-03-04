import { TranslationFunction } from '@/app/i18n/types';
import { EventCategoryEnum } from '@prisma/client';

export const descriptionHints = (
  t: TranslationFunction
): Record<EventCategoryEnum, string> => ({
  [EventCategoryEnum.TOURNAMENT]: t('descriptionHints.option1'),
  [EventCategoryEnum.CAMP]: t('descriptionHints.option2'),
  [EventCategoryEnum.SCHOOL]: t('descriptionHints.option2'),
  [EventCategoryEnum.LEAGUE]: t('descriptionHints.option1'),
  [EventCategoryEnum.SERVICE]: t('descriptionHints.option3'),
  [EventCategoryEnum.SPORT_FIELD]: t('descriptionHints.option4'),
  [EventCategoryEnum.MATCH]: t('descriptionHints.option1'),
});
