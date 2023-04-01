<script lang="ts">
	import keyPair from '$lib/stores/key-pair';
	import { createAvatar } from '@dicebear/core';
	import { miniavs } from '@dicebear/collection';
	$: avatar =
		$keyPair &&
		createAvatar(miniavs, {
			size: 128,
			seed: $keyPair.id
		}).toDataUriSync();
</script>

{#if $keyPair}
	<img src={avatar.toString()} alt="key avatar" />
{:else}
	<button data-testid="keypair-button" on:click={keyPair.generate}>Signup</button>
{/if}
