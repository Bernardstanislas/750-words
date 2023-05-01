<script lang="ts">
	import Archives from '$lib/archives.svelte';
	import Profile from '$lib/profile.svelte';
  export let lastWeek: {date: Date, hasArchive: boolean}[] = [];
</script>

<a class="flex items-center pb-4" href="/">
	<Profile />
	<h1 class="font-bold ml-4 text-3xl">750 words</h1>
</a>
<Archives {lastWeek} />
