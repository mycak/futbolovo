import { z } from 'zod';
import { TranslationFunction } from '@/app/i18n/types';

export const loginSchema = (t: TranslationFunction) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('fieldIsRequired') })
      .email({ message: t('validation.incorrectEmail') }),
    password: z.string({ message: t('fieldIsRequired') }),
  });

export type LoginInputs = z.infer<ReturnType<typeof loginSchema>>;
