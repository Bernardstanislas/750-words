import { getDateFromDayMonthYear, getParisDate } from '$lib/dates';
import client from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	const keyId = locals.session.data.keyId;
	if (!keyId) {
		throw error(403, 'You must be logged in to access this page');
	}
	const month = Number(params.month);
	const day = Number(params.day);
	const year = Number(params.year);
	if (month > 12 || day > 31 || month < 1 || day < 1) {
		throw error(422, 'Invalid date');
	}
	const date = getDateFromDayMonthYear(day, month, year);
	if (date.getTime() === getParisDate().getTime()) {
		throw error(422, "You cannot access today's journal");
	}
	try {
		const encryptedJournal = await client.get(keyId, date);
		return { encryptedJournal };
	} catch (e) {
		console.warn(e);
		throw error(404, 'Not found');
	}
};
