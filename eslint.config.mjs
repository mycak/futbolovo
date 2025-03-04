import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^(_)',
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^(_|React$|type|interface)',
        },
      ],
    },
  }),
];

export default eslintConfig;
