import { browser } from '$app/environment';
import { writable } from 'svelte/store';

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

journal.subscribe((value) => {
	if (value !== '') {
		encryptedJournal.set({ encrypting: true, value: null });
		setTimeout(() => {
			encryptedJournal.set({ encrypting: false, value });
		}, 1000);
	}
});
