// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { KeyId } from '$lib/crypto';

interface SessionData {
	keyId?: KeyId;
}

declare global {
	namespace App {
		interface Locals {
			session: import('svelte-kit-cookie-session').Session<SessionData>;
		}

		interface PageData {
			session: SessionData;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
