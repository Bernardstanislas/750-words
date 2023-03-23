<script lang="ts">
	import { journal } from '$lib/stores/journal';

	$: count = $journal.split(' ').filter((value) => !!value).length;
</script>

<p data-testid="words-count">{count} words</p>
