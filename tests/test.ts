import { expect, test } from '@playwright/test';

test('app counts words', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('journal').fill('Yolo croute lol');
	await expect(page.getByTestId('words-count')).toHaveText('3 words');
});

test("app stores journal's content", async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('journal').fill('Yolo');
	await page.reload();
	await expect(page.getByTestId('journal')).toHaveValue('Yolo');
});
