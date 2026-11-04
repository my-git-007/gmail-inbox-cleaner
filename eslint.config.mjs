// ESLint: catches real bugs (undefined or unused names, unsafe patterns) before a commit.
// Formatting is left to Prettier.
import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'build/', 'coverage/', 'node_modules/', 'public/', '.claude/', '.scratch/'] },
  js.configs.recommended,
  {
    // Project code runs in the browser.
    languageOptions: { globals: globals.browser },
  },
  {
    // Servers and scripts run in Node; scripts may also drive a real browser.
    files: ['server/**', 'scripts/**', 'tools/**', '*.config.{js,mjs,cjs}'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    rules: {
      // Unused things are errors, except names starting with "_" (deliberately unused).
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }],
      // An empty catch means "this may be unavailable, carry on".
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Security: never build code from strings.
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
    },
  },
];
