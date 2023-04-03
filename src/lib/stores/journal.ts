import { base64ToArrayBuffer } from '$lib/array-buffer';
import { decryptContent, encryptContent } from '$lib/crypto';
import keyPair from '$lib/stores/key-pair';
import debounce from 'lodash/debounce';
import { writable, type Unsubscriber } from 'svelte/store';

export const journal = writable('');

export const DEBOUNCE_DELAY = 300;

type EncryptedJournal = {
	encrypting: boolean;
	value: ArrayBuffer | null;
	dirty: boolean;
};

export const encryptedJournal = writable({
	encrypting: false,
	dirty: false,
	value: null
} as EncryptedJournal);

let unsubscriber: Unsubscriber;

keyPair.subscribe((value) => {
	if (unsubscriber) {
		unsubscriber();
	}
	if (value) {
		unsubscriber = encryptJournalUpdates(value);
	}
});

journal.subscribe((value) => {
	if (value !== '') {
		encryptedJournal.update((state) => {
			return { ...state, dirty: true };
		});
	}
});

export const encryptJournalUpdates = (keyPair: CryptoKeyPair) => {
	return journal.subscribe(
		debounce(async (value) => {
			if (value !== '') {
				encryptedJournal.update((state) => {
					return { ...state, dirty: true, encrypting: true };
				});
				const encryptedContent = await encryptContent(value, keyPair.publicKey);
				encryptedJournal.set({ encrypting: false, value: encryptedContent, dirty: false });
			}
		}, DEBOUNCE_DELAY)
	);
};

export const initJournalFromEncryptedContent = async (
	encryptedContent: string,
	privateKey: CryptoKey
) => {
	const encryptedArrayBuffer = base64ToArrayBuffer(encryptedContent);
	const content = await decryptContent(new Uint8Array(encryptedArrayBuffer), privateKey);
	journal.set(content);
};
