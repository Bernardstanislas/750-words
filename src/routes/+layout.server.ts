import { getParisDate } from '$lib/dates';
import client from '$lib/server/db';

export const load = async ({ locals }) => {
	const keyId = locals.session.data.keyId;
	if (!keyId) {
		return {};
	}
	let journals: {
		date: Date;
		content: string;
	}[] = [];
	try {
		journals = await client.listByKeyId(keyId);
	} catch (e) {
		console.warn(e);
	}
	return {
		journals: journals
			.map(({ date }) => date)
			.filter((date) => date.getTime() !== getParisDate().getTime())
	};
};
