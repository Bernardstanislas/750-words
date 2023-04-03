import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const dayRegex = /^(\d{2})-(\d{2})-(\d{2})$/;
	const match = dayRegex.exec(params.day);
	if (match === null) {
		throw error(404, 'Not found');
	}
	const [year, month, day] = [match[1], match[2], match[3]].map(Number);
	if (month > 12 || day > 31 || month < 1 || day < 1) {
		throw error(404, 'Not found');
	}
};
