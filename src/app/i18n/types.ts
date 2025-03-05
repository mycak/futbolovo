/* eslint-disable @typescript-eslint/no-explicit-any */
import translations from './locales/en/translation.json';

// Create a type for all possible translation keys using dot notation
export type TranslationKey = FlattenKeys<typeof translations>;

// Helper type to flatten nested objects into dot notation
type FlattenKeys<T extends Record<string, any>, Key extends string = ''> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? FlattenKeys<T[K], `${Key}${Key extends '' ? '' : '.'}${K & string}`>
    : `${Key}${Key extends '' ? '' : '.'}${K & string}`;
}[keyof T];

// Create a type for translation function
export interface TranslationFunction {
  (key: TranslationKey, options?: Record<string, any>): string;
  <T extends string>(key: T, options?: Record<string, any>): string; // Fallback for dynamic keys
}
