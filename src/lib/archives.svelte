<script lang="ts">
	export let dates: Date[] = [];
</script>

<h2 class="text-xl pb-2">Archives</h2>
<ul>
	{#each dates as date}
		<li>
			<a href={`${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`}>
				{date.toLocaleDateString()}
			</a>
		</li>
	{/each}
</ul>
