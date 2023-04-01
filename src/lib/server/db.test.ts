import { describe, it, expect } from 'vitest';
import client from './db';
import type { KeyId } from '$lib/crypto';

describe('The test db client', () => {
	it('stores the content', async () => {
		const content = 'La barbe de la femme à Georges Moustaki';
		const keyId = 'lol123' as KeyId;
		await client.store(keyId, content);

		const storedContent = await client.get(keyId);
		expect(storedContent).toBe(content);
	});
});
