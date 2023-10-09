var jsExtensions = ['.js', '.jsx'];
module.exports = {
  extends: [
    'plugin:import/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'import/no-unresolved': 'error',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/default': 'off',
    'prettier/prettier': ['warn', { tabWidth: 2, semi: true, singleQuote: true, printWidth: 120 }],
  },
  settings: {
    'import/extensions': jsExtensions,
    'import/resolver': {
      node: {
        extensions: jsExtensions,
      },
    },
    react: {
      version: 'detect',
    },
  },
};
