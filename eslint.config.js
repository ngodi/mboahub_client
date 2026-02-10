import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  /* Base JS rules */
  js.configs.recommended,

  /* Import rules */
  importPlugin.configs.recommended,

  /* JSX a11y rules */
  jsxA11y.configs.recommended,

  /* React Hooks rules */
  reactHooks.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],

    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      // ✅ THIS enables JSX parsing
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      // ✅ THIS fixes window, fetch, console, localStorage, etc.
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      /* React */
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-vars': 'error',

      /* Hooks */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* Imports */
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-named-as-default': 'off',

      /* A11y – relax for now */
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/interactive-supports-focus': 'off',

      /* Console */
      'no-console': 'off',
    },
  },
];
