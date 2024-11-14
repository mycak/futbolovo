import { IconText } from '@/types/common';
import { TFunction } from 'i18next';

export const heroTexts = (t: TFunction<'translation', undefined>): string[] => [
  t('hero.option1'),
  t('hero.option2'),
];

export const mainTopics = (
  t: TFunction<'translation', undefined>
): string[] => [
  t('tournaments'),
  t('leagues'),
  t('fields'),
  t('kidsSchools'),
  t('matches'),
];

export const usersIconsTexts = (
  t: TFunction<'translation', undefined>
): IconText[] => [
  {
    text: t('iconsSection.users.desc1'),
    icon: 'trophy',
    title: t('tournaments'),
  },
  {
    text: t('iconsSection.users.desc2'),
    icon: 'chalkboard-user',
    title: t('kidsSchools'),
  },

  {
    text: t('iconsSection.users.desc3'),
    icon: 'user-group',
    title: t('fields'),
  },
];

export const ownersIconsTexts = (
  t: TFunction<'translation', undefined>
): IconText[] => [
  {
    text: t('iconsSection.owners.desc1'),
    icon: 'newspaper',
    title: t('events'),
  },
  {
    text: t('iconsSection.owners.desc2'),
    icon: 'futbol',
    title: t('objects'),
  },

  {
    text: t('iconsSection.owners.desc3'),
    icon: 'school',
    title: t('services'),
  },
];

export const siteDescriptionTexts = (
  t: TFunction<'translation', undefined>
) => ({
  title: t('siteDescription.title'),
  description1: t('siteDescription.desc1'),
  description2: t('siteDescription.desc2'),
  firstButton: t('check'),
  secondButton: t('addPoint'),
});
