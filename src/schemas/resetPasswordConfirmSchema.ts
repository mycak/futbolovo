import { z } from 'zod';
import { passwordRegex } from '@/constants/common';
import { TranslationFunction } from '@/app/i18n/types';

export const confirmResetPasswordSchema = (t: TranslationFunction) =>
  z
    .object({
      password: z
        .string()
        .regex(passwordRegex, { message: t('validation.passwordConditions') }),
      repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t('validation.passwordsDontMatch'),
      path: ['repeatPassword'],
    });

export type ConfirmResetPasswordInputs = z.infer<
  ReturnType<typeof confirmResetPasswordSchema>
>;
