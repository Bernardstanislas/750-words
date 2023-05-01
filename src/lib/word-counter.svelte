<script lang="ts">
	import { journal } from '$lib/stores/journal';

  const wordsMap = new Map([
    ["one", "word"],
    ["other", "words"]
  ]);
  const pluralRule = new Intl.PluralRules("en-US");

	$: count = $journal.split(' ').filter((value) => !!value).length;
  $: words = wordsMap.get(pluralRule.select(count))
</script>

<p data-testid="words-count">{count}/750 {words}</p>
