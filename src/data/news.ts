import { StaticImageData } from 'next/image';

export interface NewsArticle {
  id: string;
  date: string; // ISO date format for i18n translation
  titleKey: string;
  contentKey: string;
  categoryKey: string;
  image?: StaticImageData;
  imageAlt?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'socca-eternis-cup-2025',
    date: '2025-09-10',
    titleKey: 'newsPage.articles.soccaEternisCup2025.title',
    contentKey: 'newsPage.articles.soccaEternisCup2025.content',
    categoryKey: 'newsPage.articles.soccaEternisCup2025.category',
  },
  {
    id: 'platform-update-july-2025',
    date: '2025-07-20',
    titleKey: 'newsPage.articles.marchUpdate.title',
    contentKey: 'newsPage.articles.marchUpdate.content',
    categoryKey: 'newsPage.articles.marchUpdate.category',
  },
  {
    id: 'polish-sixes-champions-2025',
    date: '2025-06-08',
    titleKey: 'newsPage.articles.polishChampions.title',
    contentKey: 'newsPage.articles.polishChampions.content',
    categoryKey: 'newsPage.articles.polishChampions.category',
    // Add image path when available
  },
];
