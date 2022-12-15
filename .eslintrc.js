module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'plugin:jest/recommended', 'plugin:jest/style', 'plugin:testing-library/react', 'google', 'prettier', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      ignoreRestSiblings: true
    }],
    'testing-library/no-render-in-setup': ['error', {
      allowTestingFrameworkSetupHook: 'beforeEach'
    }],
    'testing-library/no-node-access': 'off',
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/no-container': 'off',
    'testing-library/render-result-naming-convention': 'off',
    'require-jsdoc': 'off',
    'jest/no-export': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};