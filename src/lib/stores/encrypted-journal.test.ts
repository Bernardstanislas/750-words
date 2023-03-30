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
		vi.clearAllMocks();
	});

	it('has a correct inital value', () => {
		const initialValue = get(encryptedJournal);
		expect(initialValue).toEqual({ encrypting: false, value: null, dirty: false });
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
		await tick();
		{
			const encryptedJournalValue = get(encryptedJournal);
			expect(encryptedJournalValue).toEqual({ encrypting: false, value: null, dirty: true });
		}
		vi.advanceTimersToNextTimer();
		{
			await tick();
			const encryptedJournalValue = get(encryptedJournal);
			expect(encryptedJournalValue).toEqual({ encrypting: true, value: null, dirty: true });
		}
		vi.advanceTimersToNextTimer();
		{
			await tick();
			await tick();
			const encryptedJournalValue = get(encryptedJournal);
			expect(encryptedJournalValue).toEqual({ encrypting: false, value: 'test', dirty: false });
		}
	});
});
