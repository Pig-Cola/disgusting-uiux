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
              pattern: '@site/src/hooks/*',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@site/src/components/*',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@site/src/utill/class-helper',
              group: 'sibling',
              position: 'after',
            },
            {
              pattern: '@site/src/**',
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
          distinctGroup: true,
        },
      ],
    },
  },
)
