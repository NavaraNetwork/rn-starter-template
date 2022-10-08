module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'react-hooks/exhaustive-deps': ['warn'],
        'no-shadow': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-trailing-spaces': 'off',
        'prettier/prettier': 'off',
        quotes: 'off',
      },
    },
  ],
};
