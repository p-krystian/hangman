module.exports = {
  root: true,
  env: { browser: true, es2019: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 2019, sourceType: 'module' },
  settings: { react: { version: '19.1' } },
  plugins: ['react-refresh'],
  rules: {
    "react/prop-types": 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
