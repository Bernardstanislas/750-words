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
