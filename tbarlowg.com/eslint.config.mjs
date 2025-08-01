// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    ignores: [
      '**/build/**/*',
      '**/dist/**/*',
    ],
  },
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooks.configs['recommended-latest'],
    stylistic.configs.customize({
      indent: 2,
    }),
    {
      languageOptions: {
        parserOptions: {
          projectService: {
            allowDefaultProject: ['eslint.config.mjs', '*/vite.config.ts'],
          },
          sourceType: 'module',
          tsconfigRootDir: import.meta.dirname,
        },
      },
      rules: {
        'react-hooks/exhaustive-deps': 'error',
        'react/jsx-boolean-value': 'error',
        'react/jsx-curly-brace-presence': 'error',
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: [
              '.jsx',
              '.tsx',
            ],
          },
        ],
        'react/jsx-key': 'warn',
        'react/self-closing-comp': 'error',
      },
    },
  ),
]
