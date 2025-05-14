// ESLint 기본 및 확장 설정 관련
import 'eslint-plugin-only-warn';

import js from '@eslint/js';
// ESLint 플러그인
import * as importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
// React 관련 플러그인
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },

  // 기본 규칙 적용
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Hooks 규칙
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import 관련
      'import/no-unresolved': 'off', // Vite alias 고려
      'import/no-named-default': 'error',
      'import/no-default-export': 'error',

      // 정렬
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // 미사용 정리
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'error',

      // React 관련
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Prettier 적용
      'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },

  // ✅ config 파일에서 default export 허용
  {
    files: [
      '**/*.config.mjs',
      '**/*.config.js',
      '**/*.config.ts',
      '**/vite.config.*',
      '**/jest.config.*',
      '**/webpack.config.*',
      '**/next.config.*',
      'eslint.config.ts', // <- ✅ 이 부분이 추가되어야 export default 허용됨
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },

  // ✅ ShadCN UI 등 react-refresh 예외 처리
  {
    files: ['src/shared/components/ui/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  }
);
