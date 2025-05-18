// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
export default [
  {
    ignores: [
      '**/build/**/*.js',
    ],
  },
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    stylistic.configs.customize({
      indent: 2,
    }),
    {
      languageOptions: {
        parserOptions: {
          projectService: {
            allowDefaultProject: ['api/jest.config.js', 'eslint.config.mjs'],
          },
          sourceType: 'module',
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  ),
]
