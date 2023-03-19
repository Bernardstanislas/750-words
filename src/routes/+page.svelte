<script lang="ts">
	import { getContext } from 'svelte';
	import { JOURNAL } from './+layout.svelte';

	let journal: SvelteStore<string> = getContext(JOURNAL);
</script>

<h1>750 words</h1>
<textarea data-testid="journal" name="journal" bind:value={$journal} />
