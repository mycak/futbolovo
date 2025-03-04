import { z } from 'zod';
import { passwordRegex } from '@/constants/common';
import { TranslationFunction } from '@/app/i18n/types';

export const changePasswordSchema = (t: TranslationFunction) =>
  z
    .object({
      oldPassword: z.string({ message: t('fieldIsRequired') }),
      password: z
        .string()
        .regex(passwordRegex, { message: t('validation.passwordConditions') }),
      repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t('validation.passwordsDontMatch'),
      path: ['repeatPassword'],
    });

export type ChangePasswordInputs = z.infer<
  ReturnType<typeof changePasswordSchema>
>;
