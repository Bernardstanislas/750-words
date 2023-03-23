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
		journal.set('test');
		{
			const value = get(encryptedJournal);
			expect(value).toEqual({ encrypting: true, value: null });
		}
		vi.advanceTimersToNextTimer();
		{
			const value = get(encryptedJournal);
			expect(value).toEqual({ encrypting: false, value: 'test' });
		}
	});
});
