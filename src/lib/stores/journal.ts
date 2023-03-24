import { browser } from '$app/environment';
import keyPair from '$lib/stores/key-pair';
import debounce from 'lodash/debounce';
import { writable, type Unsubscriber } from 'svelte/store';

const JOURNAL = 'journal';

const storedJournal = browser ? window.localStorage.getItem(JOURNAL) : '';

export const journal = writable(storedJournal || '');
journal.subscribe((value) => {
	if (browser) {
		localStorage.setItem(JOURNAL, value);
	}
});

export const DEBOUNCE_DELAY = 300;

type EncryptedJournal = {
	encrypting: boolean;
	value: string | null;
};

export const encryptedJournal = writable({ encrypting: false, value: null } as EncryptedJournal);

let unsubscriber: Unsubscriber;

keyPair.subscribe((value) => {
	if (unsubscriber) {
		unsubscriber();
	}
	if (value) {
		unsubscriber = encryptJournalUpdates(value);
	}
});

export const encryptJournalUpdates = (keyPair: CryptoKeyPair) => {
	return journal.subscribe(
		debounce((value) => {
			if (value !== '') {
				encryptedJournal.set({ encrypting: true, value: null });
				setTimeout(() => {
					encryptedJournal.set({ encrypting: false, value });
				}, 1000);
			}
		}, DEBOUNCE_DELAY)
	);
};
