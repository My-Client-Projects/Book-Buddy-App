module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off", // React 17+ doesn't need React in scope
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
