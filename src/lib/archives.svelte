<script lang="ts">
  import classNames from "classnames";
  export let lastWeek: {date: Date, hasArchive: boolean}[] = [];
</script>

<h2 class="text-xl pb-2">Archives</h2>
<ul>
	{#each lastWeek as archive}
		<li class="py-1">
      <a
        class={classNames(
          {
            "text-gray-300": !archive.hasArchive,
            "underline": archive.hasArchive
          }
        )}
        href={archive.hasArchive ? `${archive.date.getUTCMonth() + 1}/${archive.date.getUTCDate()}/${archive.date.getUTCFullYear()}` : null}
      >
        {archive.date.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </a>
		</li>
	{/each}
</ul>
