import { describe, it, expect } from 'vitest';
import client from './db';

describe('The test db client', () => {
	it('stores the content', async () => {
		const content = 'La barbe de la femme à Georges Moustaki';
		await client.store(content);

		const storedContent = await client.get();
		expect(storedContent).toBe(content);
	});
});
