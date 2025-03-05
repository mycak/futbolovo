import { z } from 'zod';
import { AgeCategoryCategoryEnum, EventCategoryEnum } from '@prisma/client';
import { phoneRegex } from '@/constants/common';
import { TranslationFunction } from '@/app/i18n/types';

export const addEventSchema = (t: TranslationFunction) =>
  z
    .object({
      category: z.nativeEnum(EventCategoryEnum, {
        errorMap: () => ({ message: t('fieldIsRequired') }),
      }),
      location: z.object({
        latitude: z.number().nullable().optional(),
        longitude: z.number().nullable().optional(),
        addressName: z.string().nullable().optional(),
      }),
      additionalLocations: z.array(
        z.object({
          latitude: z.number().nullable().optional(),
          longitude: z.number().nullable().optional(),
          addressName: z.string().nullable().optional(),
        })
      ),
      ageCategories: z.array(z.nativeEnum(AgeCategoryCategoryEnum)).optional(),
      date: z.date().nullable().optional(),
      startDate: z.date().nullable().optional(),
      endDate: z.date().nullable().optional(),
      name: z
        .string()
        .min(1, { message: t('fieldIsRequired') })
        .min(3, { message: t('validation.min3') }),

      price: z.number().nullable().optional(),
      priceFrom: z.number({ message: t('fieldIsRequired') }).nullable(),
      priceTo: z.number().nullable().optional(),
      female: z.boolean().default(false).nullable().optional(),
      description: z.string().min(1, { message: t('fieldIsRequired') }),

      phoneNumber: z
        .string()
        .min(1, { message: t('fieldIsRequired') })
        .regex(phoneRegex, t('validation.incorrectPhone')),

      email: z.string().min(1, { message: t('fieldIsRequired') }),
      image: z.string().nullable().optional(),
      isPublished: z.boolean().default(false),
      authorId: z.string().optional(),
      termsAccepted: z.boolean({ required_error: t('fieldIsRequired') }),
    })
    .refine((data) => data.termsAccepted === true, {
      message: t('fieldIsRequired'),
      path: ['termsAccepted'],
    })
    .refine(
      (data) => {
        const requiresAgeCategories: EventCategoryEnum[] = [
          EventCategoryEnum.CAMP,
          EventCategoryEnum.TOURNAMENT,
          EventCategoryEnum.SCHOOL,
          EventCategoryEnum.MATCH,
        ];
        return (
          !requiresAgeCategories.includes(data.category) ||
          (data.ageCategories && data.ageCategories.length > 0)
        );
      },
      {
        message: t('fieldIsRequired'),
        path: ['ageCategories'],
      }
    )
    .refine(
      (data) => {
        return (
          (data.category !== EventCategoryEnum.CAMP &&
            data.category !== EventCategoryEnum.MATCH) ||
          (data.startDate && data.endDate)
        );
      },
      {
        message: t('fieldIsRequired'),
        path: ['startDate'],
      }
    )
    .refine(
      (data) => {
        return data.category !== EventCategoryEnum.TOURNAMENT || !!data.date;
      },
      {
        message: t('fieldIsRequired'),
        path: ['date'],
      }
    );

export type AddEventInputs = z.infer<ReturnType<typeof addEventSchema>>;
