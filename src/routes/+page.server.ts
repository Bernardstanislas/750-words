import type { Actions } from './$types';
import client from '$lib/server/db';
import type { KeyId } from '$lib/crypto';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const keyId = formData.get('key_id');
		const content = formData.get('encrypted_journal');
		if (!keyId) {
			throw new Error("No 'key_id' field in form data");
		}
		if (!content) {
			throw new Error("No 'encrypted_journal' field in form data");
		}
		await client.store(keyId as KeyId, content.toString());
	}
} satisfies Actions;
