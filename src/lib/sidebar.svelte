<script lang="ts">
	import Archives from '$lib/archives.svelte';
	import Profile from '$lib/profile.svelte';
	export let dates: Date[] = [];
</script>

<div class="flex items-center pb-4">
	<Profile />
	<h1 class="font-bold ml-4 mt-2 text-3xl">750 words</h1>
</div>
<Archives {dates} />
