<script context="module">
	export const JOURNAL = 'journal';
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import WordCounter from '../lib/word-counter.svelte';

	const storedJournal = browser ? window.localStorage.getItem(JOURNAL) : '';
	const journal = writable(storedJournal || '');
	journal.subscribe((value) => {
		if (browser) {
			localStorage.setItem(JOURNAL, value);
		}
	});

	setContext(JOURNAL, journal);
</script>

<slot />
<WordCounter />
