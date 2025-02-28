import { z } from 'zod';
import { TFunction } from 'i18next';

export const loginSchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('fieldIsRequired') })
      .email({ message: t('validation.incorrectEmail') }),
    password: z.string({ message: t('fieldIsRequired') }),
  });

export type LoginInputs = z.infer<ReturnType<typeof loginSchema>>;
