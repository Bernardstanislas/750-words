import { arrayBufferToBase64 } from '$lib/array-buffer';
import { generateKeyPair, encryptContent } from '$lib/crypto';
import { initJournalFromEncryptedContent, journal } from '$lib/stores/journal';
import { get } from 'svelte/store';
import { describe, it, expect } from 'vitest';

describe(
	'The journal store',
	() => {
		it('can be initialized from an encrypted journal', async () => {
			const keyPair = await generateKeyPair();
			const content = 'La barbe de la femme à Georges Moustaki';
			const encryptedContent = await encryptContent(content, keyPair.publicKey);
			const serializedEncryptedContent = arrayBufferToBase64(encryptedContent);

			await initJournalFromEncryptedContent(serializedEncryptedContent, keyPair.privateKey);
			const currentValue = get(journal);
			expect(currentValue).toBe(content);
		});
	},
	{ timeout: 10000 } // generating keypairs might take a while on entropy-low servers
);
