import { getParisDate } from '$lib/dates';
import client from '$lib/server/db';

export const load = async ({ locals }) => {
	const keyId = locals.session.data.keyId;
	if (!keyId) {
		return {};
	}
	let archives: {
		date: Date;
		content: string;
	}[] = [];
  const lastWeek: {date: Date, hasArchive: boolean}[] = [];
  const today = getParisDate();

	try {
		archives = await client.listByKeyId(keyId);
	} catch (e) {
		console.warn(e);
	}

  for (let i = 1; i < 7; i++) {
    const date = getParisDate();
    date.setDate(today.getDate() - i);
    lastWeek.push({date, hasArchive: !!archives.find((archive) => archive.date.getTime() === date.getTime())});
  }

	return {
		lastWeek
  };
};
