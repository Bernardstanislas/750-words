import type { Actions } from './$types';
import client from '$lib/server/db';
import type { KeyId } from '$lib/crypto';
import { getParisDate } from '$lib/dates';

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

		const date = getParisDate();
		await client.store(keyId as KeyId, date, content.toString());
	}
} satisfies Actions;

export const load = async ({ locals }) => {
	const keyId = locals.session.data.keyId;
	if (!keyId) {
		return {};
	}
	const date = getParisDate();
	let encryptedTodaysJournal = '';
	let journals: {
		date: Date;
		content: string;
	}[] = [];
	try {
		encryptedTodaysJournal = await client.get(keyId, date);
	} catch (e) {
		console.warn(e);
	}
	try {
		journals = await client.listByKeyId(keyId);
	} catch (e) {
		console.warn(e);
	}
	return {
		encryptedTodaysJournal,
		journals: journals
			.map(({ date }) => date)
			.filter((date) => date.getTime() !== getParisDate().getTime())
	};
};
