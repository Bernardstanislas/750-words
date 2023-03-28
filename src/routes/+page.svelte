<script lang="ts">
	import { browser } from '$app/environment';
	import { journal, encryptedJournal } from '$lib/stores/journal';
	import KeyPair from '../lib/key-pair.svelte';

	$: base64EncodedJournal = browser
		? window.btoa(
				String.fromCharCode(...new Uint8Array($encryptedJournal.value || new ArrayBuffer(0)))
		  )
		: '';
</script>

<h1>750 words</h1>
<KeyPair />
<form method="POST">
	<label>
		Today's journal
		<textarea data-testid="journal" bind:value={$journal} />
	</label>
	<input name="encrypted_journal" hidden value={base64EncodedJournal} />
	<button type="submit">Submit</button>
</form>
