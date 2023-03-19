import { decryptContent, encryptContent, generateKeyPair } from '$lib/crypto';
import { describe, it, expect } from 'vitest';

describe('The crypto module', () => {
	it('generates keypairs', async () => {
		const keyPair = await generateKeyPair();
		expect(keyPair.privateKey).toBeDefined();
		expect(keyPair.publicKey).toBeDefined();
	});

	it('encrypts content that can be decrypted', async () => {
		const content = 'La barbe de la femme à Georges Moustaki';
		const keyPair = await generateKeyPair();

		const encryptedContent = await encryptContent(content, keyPair.publicKey);

		expect(encryptedContent).toBeDefined();

		const decryptedContent = await decryptContent(encryptedContent, keyPair.privateKey);

		expect(decryptedContent).toBe(content);
	});
});
