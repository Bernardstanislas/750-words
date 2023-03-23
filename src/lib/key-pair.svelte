<script lang="ts">
	import { browser } from '$app/environment';
	import { generateKeyPair, keyPairToString, stringToKeyPair } from '../lib/crypto';

	let localKeyPair: CryptoKeyPair | null;

	const init = async () => {
		const storedKeyPair = browser ? window.localStorage.getItem('keyPair') : null;
		localKeyPair = storedKeyPair ? await stringToKeyPair(storedKeyPair) : null;
		return localKeyPair;
	};

	init();

	const generateAndStoreKey = async () => {
		const newKeyPair = await generateKeyPair();
		localKeyPair = newKeyPair;
		const newKeyPairString = await keyPairToString(newKeyPair);
		window.localStorage.setItem('keyPair', newKeyPairString);
	};
</script>

{#if localKeyPair}
	<p data-testid="keypair-message">You have a key pair! 🎉</p>
{:else}
	<button data-testid="keypair-button" on:click={generateAndStoreKey}>Give me the key</button>
{/if}
