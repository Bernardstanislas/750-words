import type { Actions } from './$types';
import client from '$lib/server/db';
import type { KeyId } from '$lib/crypto';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const keyId = formData.get('key_id') as KeyId | undefined;
		const content = formData.get('encrypted_journal');
		if (!keyId) {
			throw new Error("No 'key_id' field in form data");
		}
		if (!content) {
			throw new Error("No 'encrypted_journal' field in form data");
		}
		await locals.session.set({ keyId });
		const date = new Date();
		date.setUTCHours(0, 0, 0, 0);
		await client.store(keyId as KeyId, date, content.toString());
	}
} satisfies Actions;

export const load = async ({ locals }) => {
	const keyId = locals.session.data.keyId;
	if (!keyId) {
		return {};
	}
	const date = new Date();
	date.setUTCHours(0, 0, 0, 0);
	const encryptedJournal = await client.get(keyId, date);
	return {
		encryptedJournal
	};
};
