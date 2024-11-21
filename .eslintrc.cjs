module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
  },
  plugins: ['react-refresh'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/require-default-props': ['error', { functions: 'defaultArguments' }],
  },
};
