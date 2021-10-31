module.exports = {
   overrides: [
      {
        files: ['*.ts', '*.tsx'], // Your TypeScript files extension
        parserOptions: {
          project: ['./tsconfig.json'], // Specify it only for TypeScript files
        },
      }
    ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
   },
   plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-react'],
   extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
   ],
   root: true,
   env: {
      node: true,
      jest: true,
   },
   ignorePatterns: ['.eslintrc.js'],
   rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      'spaced-comment': 'off',
      'import/prefer-default-export': 'off',
      'no-multiple-empty-lines': 'off',
      'import/no-cycle': 'off',
      'import/extensions': 'off',
      'max-classes-per-file': 'off',
      'lines-between-class-members': 'off',
      'prefer-template': 'warn',
      "react/jsx-indent": [2, 2],
      "react/jsx-indent-props": [2, 2],
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "react/jsx-first-prop-new-line": [2, "multiline"],
      "react/jsx-max-props-per-line": [1, { "when": "multiline" }],
      "object-curly-newline": ["error", { "multiline": true }],
      "react/jsx-one-expression-per-line": "off",
      'import/no-absolute-path': 'off',
      'import/no-unresolved': 'off',
      'keyword-spacing': ['error', { before: true, after: true }]
   }
 };