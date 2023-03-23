<script lang="ts">
	import { journal } from '$lib/stores/journal';

	$: encryptedJournal = $journal.length;
</script>

<h1>750 words</h1>
<form method="POST">
	<label>
		Today's journal
		<textarea data-testid="journal" bind:value={$journal} />
	</label>
	<input name="encrypted_journal" hidden value={encryptedJournal} />
	<button type="submit">Submit</button>
</form>
