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

test('app generates a key pair', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByTestId('keypair-button')).toBeVisible();
	await page.getByTestId('keypair-button').click();
	await expect(page.getByTestId('keypair-message')).toBeVisible();

	await page.reload();
	await expect(page.getByTestId('keypair-message')).toBeVisible();
});
