<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/sidebar.svelte';
	export let data;
</script>

<div class="sm:flex px-4 sm:px-0 mx-auto container mt-4 sm:mt-2">
	<div class="sm:basis-1/4">
		<Sidebar lastWeek={data.lastWeek} />
	</div>
	<div class="sm:grow pt-3">
		<slot />
	</div>
</div>
