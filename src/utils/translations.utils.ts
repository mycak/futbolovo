import { TranslationFunction } from '@/app/i18n/types';
import { EventCategoryEnum } from '@prisma/client';

export const translateEventType = (
  event: EventCategoryEnum,
  t: TranslationFunction
) => {
  switch (event) {
    case EventCategoryEnum.TOURNAMENT:
      return t('tournament');
    case EventCategoryEnum.SCHOOL:
      return t('academyOrSchool');
    case EventCategoryEnum.SPORT_FIELD:
      return t('field');
    case EventCategoryEnum.CAMP:
      return t('camp');
    case EventCategoryEnum.LEAGUE:
      return t('league');
    case EventCategoryEnum.SERVICE:
      return t('service');
    case EventCategoryEnum.MATCH:
      return t('match');
    default:
      return t('unknown');
  }
};
