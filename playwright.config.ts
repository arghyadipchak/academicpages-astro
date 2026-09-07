import { defineConfig, devices } from '@playwright/test';
import { siteConfig } from './src/data/siteConfig';

const base = (process.env.ASTRO_BASE ?? siteConfig.baseurl ?? '').replace(
  /\/$/,
  ''
);
const serverUrl = `http://localhost:4321${base ? `${base}/` : '/'}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    headless: true,
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 7'],
        viewport: { width: 393, height: 851 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: process.env.CI ? 'pnpm preview' : 'pnpm dev',
    url: serverUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
