<script lang="ts">
	import keyPair from '$lib/stores/key-pair';
</script>

{#if $keyPair}
	<p data-testid="keypair-message">{$keyPair.id}</p>
{:else}
	<button data-testid="keypair-button" on:click={keyPair.generate}>Give me the key</button>
{/if}
