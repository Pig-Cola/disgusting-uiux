import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, importPlugin.flatConfigs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/ban-ts-comment': 'off',
      'space-in-parens': [1, 'always'],
      'import/no-unresolved': 0,
      'import/order': [
        1,
        {
          groups: ['builtin', 'external', 'internal', 'parent', ['sibling', 'index'], 'unknown', 'type'],
          pathGroups: [
            {
              pattern: 'react*',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/hooks/*',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/components/*',
              group: 'internal',
              position: 'before',
            },
            // {
            //   pattern: '@/zustand/*',
            //   group: 'internal',
            //   position: 'before',
            // },
            {
              pattern: '@/lib/moduleCSS-helper',
              group: 'sibling',
              position: 'after',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '*.(s)?css',
              group: 'index',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['react', '@/utill/class-helper', '*.(s)?css'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          distinctGroup: false,
        },
      ],
    },
    settings: {
      'import/ignore': ['node_modules'],
    },
  }
)
