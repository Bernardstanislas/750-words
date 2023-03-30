import type { Actions } from './$types';
import client from '$lib/server/db';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const content = formData.get('encrypted_journal');
		if (!content) {
			throw new Error("No 'encrypted_journal' field in form data");
		}
		await client.store(content.toString());
	}
} satisfies Actions;
