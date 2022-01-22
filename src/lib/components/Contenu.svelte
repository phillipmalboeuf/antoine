<script lang="ts">
  import type { Entry } from 'contentful'
  import Gallerie from './Gallerie.svelte'
  import Text from './Text.svelte'

  export let contenu: Entry<any>[]
</script>


{#each contenu as entry, i}
{#if entry.sys.contentType.sys.id === 'text'}
<Text {entry} visible={i === 0} />
{:else if entry.sys.contentType.sys.id === 'gallerie'}
<Gallerie {entry} visible={i === 0} />
{/if}
{/each}

