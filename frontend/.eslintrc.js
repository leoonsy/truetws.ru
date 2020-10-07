require('dotenv').config();

module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
    es2021: true,
  },

  rules: {
    'no-console': process.env.MODE === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.MODE === 'production' ? 'warn' : 'off',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:vue/recommended',
  ],
};
