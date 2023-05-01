<script lang="ts">
	import keyPair from '$lib/stores/key-pair';
	import { miniavs } from '@dicebear/collection';
	import { createAvatar } from '@dicebear/core';

	$: loggedIn = $keyPair;
	$: avatar =
		loggedIn &&
		createAvatar(miniavs, {
			size: 128,
			seed: $keyPair.id
		}).toDataUriSync();
</script>

{#if loggedIn}
	<div class="bg-gray-300 rounded-full overflow-hidden">
		<img class="w-12" src={avatar.toString()} alt="key avatar" />
	</div>
{:else}
	<button data-testid="keypair-button" on:click={keyPair.generate}>Signup</button>
{/if}
