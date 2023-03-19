import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('journal').fill('Yolo croute lol');
	await expect(page.getByTestId('words-count')).toHaveText('3 words');
});
