import { getDateFromDayMonthYear } from '$lib/dates';
import client from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	const keyId = locals.session.data.keyId;
	if (!keyId) {
		throw error(403, 'You must be logged in to access this page');
	}
	const dayRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
	const match = dayRegex.exec(params.day);
	if (match === null) {
		throw error(422, 'Invalid date');
	}
	const [year, month, day] = [match[1], match[2], match[3]].map(Number);
	if (month > 12 || day > 31 || month < 1 || day < 1) {
		throw error(422, 'Invalid date');
	}
	const date = getDateFromDayMonthYear(day, month, year);
	try {
		const encryptedArchive = await client.get(keyId, date);
		return { encryptedArchive };
	} catch (e) {
		console.warn(e);
		throw error(404, 'Not found');
	}
};
