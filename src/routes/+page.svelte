<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';
	import keyPair from '$lib/stores/key-pair';
	import { arrayBufferToBase64 } from '$lib/array-buffer';
	import { journal, encryptedJournal, initJournalFromEncryptedContent } from '$lib/stores/journal';
	import type { PageData } from './$types';
	import type { Unsubscriber } from 'svelte/store';

	export let data: PageData;
	let form: HTMLFormElement;
	let unsubscribe: Unsubscriber;

	const subscribeToEncryptedJournalChanges = () => {
		unsubscribe = encryptedJournal.subscribe(async (value) => {
			if (value.dirty === false && value.encrypting === false) {
				await tick();
				form.submit();
			}
		});
	};

	$: if ($keyPair && data.encryptedTodaysJournal) {
		initJournalFromEncryptedContent(data.encryptedTodaysJournal, $keyPair.privateKey);
	}

	$: base64EncodedJournal = browser
		? arrayBufferToBase64($encryptedJournal.value || new ArrayBuffer(0))
		: '';

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<p>Archives</p>
<ul>
	{#each data.journals || [] as journalDate}
		<li>
			<a
				href={`${
					journalDate.getUTCMonth() + 1
				}/${journalDate.getUTCDate()}/${journalDate.getUTCFullYear()}`}
				>{journalDate.toLocaleDateString()}</a
			>
		</li>
	{/each}
</ul>
<form method="POST" bind:this={form}>
	<label>
		Today's journal
		<textarea
			data-testid="journal"
			bind:value={$journal}
			on:input|once={subscribeToEncryptedJournalChanges}
		/>
	</label>
	<input name="key_id" hidden value={$keyPair?.id} />
	<input name="encrypted_journal" hidden value={base64EncodedJournal} />
	<button type="submit" disabled={$encryptedJournal.dirty}>Submit</button>
</form>
