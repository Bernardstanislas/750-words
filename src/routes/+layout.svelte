<script lang="ts">
	import '../app.css';
	import classname from 'classnames';
	import WordCounter from '$lib/word-counter.svelte';
	import KeyPair from '$lib/key-pair.svelte';
</script>

<div
	class={classname(
		'sm:rounded-2xl sm:drop-shadow-xl bg-white px-8 py-6 flex-1',
		'font-serif',
		'mx-auto w-full sm:w-4/5 lg:w-[800px]',
		'my-0 sm:my-3 md:my-10 lg:my-16'
	)}
>
	<div class="flex justify-between">
		<h1 class="text-3xl">750 words</h1>
		<KeyPair />
	</div>
	<slot />
	<WordCounter />
</div>
