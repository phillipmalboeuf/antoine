<script lang="ts">
  import type { Entry } from 'contentful'
  import Gallerie from './Gallerie.svelte'
  import Realisations from './Realisations.svelte'
  import Text from './Text.svelte'

  export let contenu: Entry<any>[]
  export let root: HTMLElement = undefined
</script>


{#each contenu as entry, i}
{#if entry.sys.contentType.sys.id === 'text'}
<Text {entry} visible={i === 0} {root} />
{:else if entry.sys.contentType.sys.id === 'gallerie'}
<Gallerie photos={entry.fields.photos} padded captions={entry.fields.photos.map(photo => photo.fields.description)} visible={i === 0} {root}>
  <p slot="content">{entry.fields.titre}</p>
</Gallerie>
{:else if entry.sys.contentType.sys.id === 'realisations'}
<Realisations {entry} visible={i === 0} />
{/if}
{/each}

