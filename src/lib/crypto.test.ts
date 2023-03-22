import {
	decryptContent,
	encryptContent,
	exportKeyPair,
	generateKeyPair,
	importKeyPair
} from '$lib/crypto';
import { describe, it, expect } from 'vitest';

describe('The crypto module', () => {
	const content = 'La barbe de la femme à Georges Moustaki';

	it('generates keypairs', async () => {
		const keyPair = await generateKeyPair();
		expect(keyPair.privateKey).toBeDefined();
		expect(keyPair.publicKey).toBeDefined();
	});

	it('encrypts content that can be decrypted', async () => {
		const keyPair = await generateKeyPair();

		const encryptedContent = await encryptContent(content, keyPair.publicKey);

		expect(encryptedContent).toBeDefined();

		const decryptedContent = await decryptContent(encryptedContent, keyPair.privateKey);

		expect(decryptedContent).toBe(content);
	});

	it('exports and imports keypairs', async () => {
		const keyPair = await generateKeyPair();

		const exportedKeyPair = await exportKeyPair(keyPair);
		expect(exportedKeyPair).toBeDefined();

		const importedKeyPair = await importKeyPair(exportedKeyPair);
		expect(importedKeyPair).toBeDefined();

		const encryptedContent = await encryptContent(content, keyPair.publicKey);
		const decryptedContent = await decryptContent(encryptedContent, importedKeyPair.privateKey);
		expect(decryptedContent).toBe(content);
	});
});
