import eslint from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['build/*', '.docusaurus/*'] },
  eslint.configs.recommended,
  tseslint.configs.eslintRecommended,
  tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    rules: {
      'space-in-parens': [1, 'always'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
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
            {
              pattern: '@/lib/moduleCSS-helper',
              group: 'sibling',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '*.module.(s)?css',
              group: 'index',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['react', '@/lib/moduleCSS-helper', '*.module.(s)?css'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          distinctGroup: false,
        },
      ],
    },
  },
)
