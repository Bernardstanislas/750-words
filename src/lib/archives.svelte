<script lang="ts">
	export let dates: Date[] = [];
</script>

<h2 class="text-xl pb-2">Archives</h2>
<ul>
	{#each dates as date}
		<li class="py-1">
			<a class="underline" href={`${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`}>
				{date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
			</a>
		</li>
	{/each}
</ul>
