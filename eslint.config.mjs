import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const browserGlobals = {
  window: 'readonly',
  localStorage: 'readonly',
  document: 'readonly',
  StorageEvent: 'readonly',
};

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**'],
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: browserGlobals,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Add or override rules here
    },
  },
]; 