import { z } from 'zod';
import { TFunction } from 'i18next';

export const resetPasswordSchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('fieldIsRequired') })
      .email({ message: t('validation.incorrectEmail') }),
  });

export type ResetPasswordInputs = z.infer<
  ReturnType<typeof resetPasswordSchema>
>;
