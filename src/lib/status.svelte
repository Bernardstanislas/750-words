<script lang="ts">
  export let savingPromise: Promise<void>;
  export let dirty: boolean;

</script>

<i data-testid="status">
	{#await savingPromise}
		Saving...
	{:then _}
		{#if dirty}
			Not saved
		{:else}
			Saved
		{/if}
	{:catch error}
		{error.message}
	{/await}
</i>
