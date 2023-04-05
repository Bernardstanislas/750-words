<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';
	import keyPair from '$lib/stores/key-pair';
	import { arrayBufferToBase64 } from '$lib/array-buffer';
	import { journal, encryptedJournal, initJournalFromEncryptedContent } from '$lib/stores/journal';
	import type { PageData } from './$types';
	import type { Unsubscriber } from 'svelte/store';

	export let data: PageData;
	let form: HTMLFormElement;
	let unsubscribe: Unsubscriber;
	let savingPromise: Promise<unknown> = Promise.resolve();

	const submitForm = async () => {
		savingPromise = fetch('/', {
			method: 'POST',
			body: new FormData(form)
		});
	};
	const subscribeToEncryptedJournalChanges = () => {
		unsubscribe = encryptedJournal.subscribe(async (value) => {
			if (value.dirty === false && value.encrypting === false) {
				await tick();
				await submitForm();
			}
		});
	};

	$: if ($keyPair && data.encryptedTodaysJournal) {
		initJournalFromEncryptedContent(data.encryptedTodaysJournal, $keyPair.privateKey);
	}

	$: base64EncodedJournal = browser
		? arrayBufferToBase64($encryptedJournal.value || new ArrayBuffer(0))
		: '';

	onMount(() => {
		$journal = '';
	});
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
			>
				{journalDate.toLocaleDateString()}
			</a>
		</li>
	{/each}
</ul>
<form bind:this={form}>
	<label>
		Today's journal
		<textarea bind:value={$journal} on:input|once={subscribeToEncryptedJournalChanges} rows="10" />
	</label>
	<input name="key_id" hidden value={$keyPair?.id} />
	<input name="encrypted_journal" hidden value={base64EncodedJournal} />
</form>
<i data-testid="status">
	{#await savingPromise}
		Saving...
	{:then _}
		{#if $encryptedJournal.dirty}
			Not saved
		{:else}
			Saved
		{/if}
	{:catch error}
		{error.message}
	{/await}
</i>
