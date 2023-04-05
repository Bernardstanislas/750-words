<script lang="ts">
	import type { PageData } from './$types';
	import keyPair from '$lib/stores/key-pair';
	import { initJournalFromEncryptedContent, journal } from '$lib/stores/journal';

	export let data: PageData;
	$: if ($keyPair && data.encryptedJournal) {
		initJournalFromEncryptedContent(data.encryptedJournal, $keyPair.privateKey);
	}
</script>

<div data-testid="journal">{$journal}</div>
<a href="/">Back to today's journal</a>
