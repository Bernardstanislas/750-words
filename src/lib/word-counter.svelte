<script lang="ts">
	import { getContext } from 'svelte';
	import { JOURNAL } from '../routes/+layout.svelte';

	let journal: SvelteStore<string> = getContext(JOURNAL);
	$: count = $journal.split(' ').filter((value) => !!value).length;
</script>

<p data-testid="words-count">{count} words</p>
