<script context="module">
	export const JOURNAL = 'journal';
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import WordCounter from '../lib/word-counter.svelte';

	const journal = writable('');
	setContext(JOURNAL, journal);
</script>

<slot />
<WordCounter />
