<script lang="ts">
  import { page } from '$app/stores';
	import type { PageData } from './$types';
	import keyPair from '$lib/stores/key-pair';
	import { initJournalFromEncryptedContent, journal } from '$lib/stores/journal';
  import { getDateFromDayMonthYear } from '$lib/dates';

	const date = getDateFromDayMonthYear($page.params.day, $page.params.month, $page.params.year);
	export let data: PageData;
	$: if ($keyPair && data.encryptedJournal) {
		initJournalFromEncryptedContent(data.encryptedJournal, $keyPair.privateKey);
	}
</script>

<div class="pt-2">
  <h2 class="text-xl">
    {date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
  </h2>
  <div class="pt-2 italic" data-testid="journal">{$journal}</div>
</div>
