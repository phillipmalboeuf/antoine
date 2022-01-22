<script lang="ts">
  import type { Entry } from 'contentful'
  import Gallerie from './Gallerie.svelte'
  import Text from './Text.svelte'

  export let contenu: Entry<any>[]
</script>


{#each contenu as entry}
{#if entry.sys.contentType.sys.id === 'text'}
<Text {entry} />
{:else if entry.sys.contentType.sys.id === 'gallerie'}
<Gallerie {entry} />
{/if}
{/each}

