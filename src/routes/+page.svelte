<script lang="ts">
	import { browser } from '$app/environment';
	import keyPair from '$lib/stores/key-pair';
	import { arrayBufferToBase64 } from '$lib/array-buffer';
	import { journal, encryptedJournal, initJournalFromEncryptedContent } from '$lib/stores/journal';
	import KeyPair from '../lib/key-pair.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: if ($keyPair) {
		initJournalFromEncryptedContent(data.encryptedJournal, $keyPair.privateKey);
	}
	$: base64EncodedJournal = browser
		? arrayBufferToBase64($encryptedJournal.value || new ArrayBuffer(0))
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
	<button type="submit" disabled={$encryptedJournal.dirty}>Submit</button>
</form>
