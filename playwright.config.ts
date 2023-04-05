import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		env: {
			MODE: 'test',
			DUPLICATE_DB_ENTRIES: 'true'
		}
	},
	testDir: 'tests'
};

export default config;
