import { describe, it, expect } from 'vitest';
import client from './db';
import type { KeyId } from '$lib/crypto';

describe('The test db client', () => {
	const content = 'La barbe de la femme à Georges Moustaki';
	const keyId = 'lol123' as KeyId;
	const date = new Date();
	it('stores the content', async () => {
		await client.store(keyId, date, content);

		const storedContent = await client.get(keyId, date);
		expect(storedContent).toBe(content);
	});

	it('lists the content by keyId', async () => {
		await client.store(keyId, date, content);
		const yesterday = new Date(date);
		yesterday.setDate(yesterday.getDate() - 1);
		await client.store(keyId, yesterday, content);

		const entries = await client.listByKeyId(keyId);
		expect(entries).toEqual([
			{ date: date, content },
			{ date: yesterday, content }
		]);
	});
});
