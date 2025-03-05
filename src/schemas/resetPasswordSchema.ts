import { z } from 'zod';
import { TranslationFunction } from '@/app/i18n/types';

export const resetPasswordSchema = (t: TranslationFunction) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('fieldIsRequired') })
      .email({ message: t('validation.incorrectEmail') }),
  });

export type ResetPasswordInputs = z.infer<
  ReturnType<typeof resetPasswordSchema>
>;
