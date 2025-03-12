import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwrightPlugin from 'eslint-plugin-playwright';

export default [
  // Base config with ignores
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/playwright-report/**', '**/axe-reports/**']
  },
  
  eslint.configs.recommended,
  
  {
    files: ['**/*.{ts,tsx}'],
    ...tseslint.configs.recommendedTypeChecked[0],
    languageOptions: {
      parserOptions: {
        project: true
      }
    }
  },
  
  {
    files: ['**/*.{ts,tsx}'],
    ...tseslint.configs.stylistic[0]
  },
  
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
        playwright: playwrightPlugin
    },
    rules: {
        ...playwrightPlugin.configs.recommended.rules,
        'playwright/no-conditional-in-test': "off",
        'playwright/no-conditional-expect': "off",
        'playwright/no-skipped-test': "off",
    }
  }
];