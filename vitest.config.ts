import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@saraha/dto': path.resolve(__dirname, 'libs/dto/src/index.ts'),
      '@saraha/utils': path.resolve(__dirname, 'libs/utils/src/index.ts'),
      '@saraha/data-access': path.resolve(__dirname, 'libs/data-access/src/index.ts'),
      '@app': path.resolve(__dirname, 'apps/backend/src/app'),
    },
  },
  test: {
    environment: 'node',
    include: ['apps/backend/src/**/*.api.spec.ts'],
    exclude: ['apps/*-e2e/**'],
  },
});
