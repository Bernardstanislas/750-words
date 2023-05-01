<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/sidebar.svelte';
	export let data;
</script>

<div class="flex mx-auto container mt-2">
	<div class="basis-1/4">
		<Sidebar dates={data.journals} />
	</div>
	<div class="grow pt-3">
		<slot />
	</div>
</div>
