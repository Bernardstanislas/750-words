import { handleSession } from 'svelte-kit-cookie-session';

export const handle = handleSession({
	secret: 'SOME_COMPLEX_SECRET_AT_LEAST_32_CHARS'
});
