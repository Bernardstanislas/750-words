import { get } from 'svelte/store';
import { describe, it, expect } from 'vitest';
import keyPair from './key-pair';

describe('The key pair store', () => {
	it('has no key pair initially', () => {
		expect(get(keyPair)).toBeUndefined();
	});

	it('generates a key pair', async () => {
		await keyPair.generate();
		expect(get(keyPair)).toBeDefined();
	});
});
