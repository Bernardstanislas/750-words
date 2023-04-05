import { expect, test } from '@playwright/test';

test('app counts words', async ({ page }) => {
	await page.goto('/');
	await page.locator('textarea').fill('Yolo croute lol');
	await expect(page.getByTestId('words-count')).toHaveText('3 words');
});

test("app stores journal's content", async ({ page }) => {
	const content = 'La barbe de la femme à Georges Moustaki';
	await page.goto('/');

	// Generate a private key
	await expect(page.getByTestId('keypair-button')).toBeVisible();
	await page.getByTestId('keypair-button').click();
	await expect(page.locator('img[alt="key avatar"]')).toBeVisible();

	// Fill the journal and save it
	const status = page.getByTestId('status');
	const journal = page.locator('textarea');
	await expect(status).toHaveText('Saved');
	await journal.type(content);
	await expect(status).toHaveText('Not saved');
	await expect(status).toHaveText('Saved');

	// Check it was actually saved and restored
	await page.reload();
	await expect(journal).toHaveValue(content);

	// Navigate to yersderday's journal
	await expect(page.locator('a')).toHaveCount(2);
	await page.locator('a').last().click();
	await expect(page.getByTestId('journal')).toHaveText(content);
});
