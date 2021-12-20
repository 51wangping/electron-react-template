module.exports = {
  extends: ['react-app'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  rules: {
    "react/jsx-uses-react": 0,
    "react/jsx-uses-vars": 0,
    "react/react-in-jsx-scope": 0,
    // 'prettier/prettier': 'warn',
    // 'no-unused-vars': 'off',
    // eqeqeq: 'error',
    // 'simple-import-sort/imports': 'error',
    // 'simple-import-sort/exports': 'error',
    // 'react-hooks/exhaustive-deps': 'warn'
  }
};
