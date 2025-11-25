import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Only import vitest types if running tests
const isTest = process.env.NODE_ENV === 'test';
let testConfig: UserConfig['test'] = undefined;

if (isTest) {
  // Dynamic import so Vitest is only loaded during tests
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { configDefaults } = require('vitest/config.js');
  testConfig = {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
    },
    reporters: ['verbose'],
    exclude: [
      ...configDefaults.exclude,
      './src/__tests__/integration-test/home.test.tsx',
      './src/__tests__/App.test.tsx',
    ],
    setupFiles: './test-setup.ts',
  };
}

export default defineConfig({
  plugins: [react()],
  ...(testConfig ? { test: testConfig } : {}),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
