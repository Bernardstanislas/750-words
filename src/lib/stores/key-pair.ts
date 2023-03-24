import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { generateKeyPair, keyPairToString, stringToKeyPair } from '$lib/crypto';

const keyPairStoreFactory = () => {
	const { subscribe, set } = writable<CryptoKeyPair>();

	const init = async () => {
		const storedKeyPair = localStorage.getItem('keyPair');
		const localKeyPair = storedKeyPair ? await stringToKeyPair(storedKeyPair) : null;
		if (localKeyPair) {
			set(localKeyPair);
		}
	};

	const generate = async () => {
		const newKeyPair = await generateKeyPair();
		set(newKeyPair);
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
