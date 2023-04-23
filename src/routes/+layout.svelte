<script lang="ts">
	import '../app.css';
	import classname from 'classnames';
	import WordCounter from '$lib/word-counter.svelte';
	import KeyPair from '$lib/key-pair.svelte';
</script>

<div
	class={classname(
		'rounded-lg bg-white px-8 py-6 flex-1',
		'font-serif',
		'mx-2 sm:mx-6 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-44',
		'my-2 sm:my-3 md:my-10 lg:my-16 xl:my-20 2xl:my-32'
	)}
>
	<h1 class="text-3xl">750 words</h1>
	<KeyPair />
	<slot />
	<WordCounter />
</div>
