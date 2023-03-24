import { encryptedJournal, journal } from '$lib/stores/journal';
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

	it('starts encrypting after the journal changes', () => {
		vi.mock('lodash/debounce', () => ({
			default: (f: (...args: unknown[]) => unknown) => (args: unknown) => {
				setTimeout(() => {
					f(args);
				}, 100);
			}
		}));

		journal.set('test');
		{
			const encryptedJournalValue = get(encryptedJournal);
			expect(encryptedJournalValue).toEqual({ encrypting: false, value: null });
		}
		vi.advanceTimersToNextTimer();
		{
			const encryptedJournalValue = get(encryptedJournal);
			expect(encryptedJournalValue).toEqual({ encrypting: true, value: null });
		}
		vi.advanceTimersToNextTimer();
		{
			const encryptedJournalValue = get(encryptedJournal);
			expect(encryptedJournalValue).toEqual({ encrypting: false, value: 'test' });
		}
	});
});
