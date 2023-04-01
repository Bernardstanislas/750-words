import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { generateKeyPair, keyPairToString, stringToKeyPair } from '$lib/crypto';
import { keyId } from '$lib/crypto';

type KeyPair = {
	publicKey: CryptoKey;
	privateKey: CryptoKey;
	id: string;
};

const keyPairStoreFactory = () => {
	const { subscribe, set } = writable<KeyPair>();

	const init = async () => {
		const storedKeyPair = localStorage.getItem('keyPair');
		const localKeyPair = storedKeyPair ? await stringToKeyPair(storedKeyPair) : null;
		if (localKeyPair) {
			const id = await keyId(localKeyPair.publicKey);
			set({ ...localKeyPair, id });
		}
	};

	const generate = async () => {
		const newKeyPair = await generateKeyPair();
		const id = await keyId(newKeyPair.publicKey);
		set({ ...newKeyPair, id });
		if (browser) {
			const newKeyPairString = await keyPairToString(newKeyPair);
			localStorage.setItem('keyPair', newKeyPairString);
		}
	};

	if (browser) {
		init();
	}

	return {
		subscribe,
		generate
	};
};

export default keyPairStoreFactory();
