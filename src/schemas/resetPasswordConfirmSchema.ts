import { z } from 'zod';
import { TFunction } from 'i18next';
import { passwordRegex } from '@/constants/common';

export const confirmResetPasswordSchema = (
  t: TFunction<'translation', undefined>
) =>
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
