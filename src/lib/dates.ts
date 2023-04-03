export const getParisDate = (): Date => {
	const date = new Date();
	date.setUTCHours(0, 0, 0, 0);
	return date;
};

export const getDateFromDayMonthYear = (day: number, month: number, year: number): Date => {
	return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
};
