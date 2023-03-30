import { expect, test } from '@playwright/test';

test('app counts words', async ({ page }) => {
	await page.goto('/');
	await page.getByTestId('journal').fill('Yolo croute lol');
	await expect(page.getByTestId('words-count')).toHaveText('3 words');
});

test("app stores journal's content", async ({ page }) => {
	const content = 'La barbe de la femme à Georges Moustaki';
	await page.goto('/');

	// Generate a private key
	await expect(page.getByTestId('keypair-button')).toBeVisible();
	await page.getByTestId('keypair-button').click();
	await expect(page.getByTestId('keypair-message')).toBeVisible();

	// Fill the journal and save it
	await page.getByTestId('journal').fill(content);
	await page.locator('button[type="submit"]').click();

	// Check it was actually saved and restored
	await page.reload();
	await expect(page.getByTestId('journal')).toHaveValue(content);
});
