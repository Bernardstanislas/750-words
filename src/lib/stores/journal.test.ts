import { encryptedJournal, encryptJournalUpdates, journal } from '$lib/stores/journal';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('The encrypted journal store', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('has a correct inital value', () => {
		const initialValue = get(encryptedJournal);
		expect(initialValue).toEqual({ encrypting: false, value: null });
	});

	it('starts encrypting after the journal changes', async () => {
		vi.mock('$lib/crypto', () => ({
			encryptContent: async (value: string) => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(value);
					}, 100);
				});
			}
		}));

		encryptJournalUpdates({} as CryptoKeyPair);
		journal.set('test');
		{
			const encryptedJournalValue = get(encryptedJournal);
			expect(encryptedJournalValue).toEqual({ encrypting: false, value: null });
		}
		vi.advanceTimersToNextTimer();
		{
			await tick();
			const encryptedJournalValue = get(encryptedJournal);
			expect(encryptedJournalValue).toEqual({ encrypting: true, value: null });
		}
		vi.advanceTimersToNextTimer();
		{
			await tick();
			await tick();
			const encryptedJournalValue = get(encryptedJournal);
			expect(encryptedJournalValue).toEqual({ encrypting: false, value: 'test' });
		}
	});
});
