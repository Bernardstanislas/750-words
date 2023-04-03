<script lang="ts">
	import type { PageData } from './$types';
	import keyPair from '$lib/stores/key-pair';
	import { initJournalFromEncryptedContent, journal } from '$lib/stores/journal';

	export let data: PageData;
	$: if ($keyPair && data.encryptedArchive) {
		initJournalFromEncryptedContent(data.encryptedArchive, $keyPair.privateKey);
	}
</script>

<div>{$journal}</div>
