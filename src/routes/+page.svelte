<script lang="ts">
	import { journal, encryptedJournal } from '$lib/stores/journal';
	import KeyPair from '../lib/key-pair.svelte';
</script>

<h1>750 words</h1>
<KeyPair />
<form method="POST">
	<label>
		Today's journal
		<textarea data-testid="journal" bind:value={$journal} />
	</label>
	<input name="encrypted_journal" hidden value={$encryptedJournal.value} />
	<button type="submit">Submit</button>
</form>
