<script lang="ts">
	import '../app.css';
	import WordCounter from '$lib/word-counter.svelte';
	import KeyPair from '$lib/key-pair.svelte';
</script>

<h1>750 words</h1>
<KeyPair />
<slot />
<WordCounter />
