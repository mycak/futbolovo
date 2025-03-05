import { z } from 'zod';
import { passwordRegex } from '@/constants/common';
import { TranslationFunction } from '@/app/i18n/types';

export const registerSchema = (t: TranslationFunction) =>
  z
    .object({
      email: z
        .string()
        .min(1, { message: t('fieldIsRequired') })
        .email({ message: t('validation.incorrectEmail') }),

      password: z
        .string()
        .regex(passwordRegex, { message: t('validation.passwordConditions') }),
      repeatPassword: z.string(),
      firstName: z.string().min(1, { message: t('fieldIsRequired') }),
      lastName: z.string().min(1, { message: t('fieldIsRequired') }),
      companyName: z.string().optional(),
      termsAndConditions: z.boolean(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t('validation.passwordsDontMatch'),
      path: ['repeatPassword'],
    })
    .refine((data) => data.termsAndConditions === true, {
      message: t('fieldIsRequired'),
      path: ['termsAndConditions'],
    });

export type RegisterInputs = z.infer<ReturnType<typeof registerSchema>>;
