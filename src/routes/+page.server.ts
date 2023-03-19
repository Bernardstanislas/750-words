import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		console.log('formData', await request.formData());
	}
} satisfies Actions;
