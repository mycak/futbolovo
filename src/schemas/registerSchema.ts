import { z } from 'zod';
import { TFunction } from 'i18next';
import { passwordRegex } from '@/constants/common';

export const registerSchema = (t: TFunction<'translation', undefined>) =>
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
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t('validation.passwordsDontMatch'),
      path: ['repeatPassword'],
    });

export type RegisterInputs = z.infer<ReturnType<typeof registerSchema>>;
