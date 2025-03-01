import { z } from 'zod';
import { TFunction } from 'i18next';
import { passwordRegex } from '@/constants/common';

export const changePasswordSchema = (t: TFunction<'translation', undefined>) =>
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
