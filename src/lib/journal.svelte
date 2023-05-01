<script lang="ts">
	import { journal } from '$lib/stores/journal';
  export let onChange: () => void;
</script>

<textarea
  autofocus
  class="w-full px-4 py-3 border border-gray-100"
  bind:value={$journal}
  on:input|once={onChange}
  rows="10"
/>
