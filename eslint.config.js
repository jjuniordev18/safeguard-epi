// ESLint 9 (flat config) — lint do front (app.js) e do backend (server/).
// Config permissiva: pega erros reais sem quebrar o app.
const globals = require('globals');
const js = require('@eslint/js');

module.exports = [
  { ignores: ['node_modules/**', 'server/node_modules/**', 'server/data/**'] },
  js.configs.recommended,
  {
    files: ['app.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        // bibliotecas externas carregadas via CDN
        jsPDF: 'readonly', QRCode: 'readonly', BarcodeDetector: 'readonly'
      }
    },
    rules: {
      // app.js é um script global movido a onclick="" no HTML (sem import/export).
      // Disciplica de "não usar" e "redeclare" não se aplica a esse formato:
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-inner-declarations': 'off'
    }
  },
  {
    files: ['domain.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: { ...globals.browser, module: 'readonly' }
    }
  },
  {
    files: ['server/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node }
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-console': 'off'
    }
  }
];