<script lang="ts">
  import type { Entry, RichTextContent, Asset } from 'contentful'
  import { onMount } from 'svelte'
  
  import Document from './document/Document.svelte'
  import Picture from './Picture.svelte'

  export let entry: Entry<{
    titre: string
    id: string
    text: RichTextContent
    photo: Asset
    type: string
  }>

  let visible = false
  let element: HTMLElement

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(node => {
          console.log(node)
          visible = node.isIntersecting
          // console.log(node.isIntersecting, node.target)
        })
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  })
</script>

<section id={entry.fields.id}>
  {#if entry.fields.titre}<h6>{entry.fields.titre}</h6>{/if}
  {#if entry.fields.text}<div class:visible class="content {entry.fields.type?.toLowerCase().replace(' ', '_').replace('é', 'e')}"><Document body={entry.fields.text} /></div>{/if}
  <div class="spacer" bind:this={element} />
  {#if entry.fields.photo}<figure><Picture media={entry.fields.photo} /></figure>{/if}
</section>


<style lang="scss">
  .content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: var(--gutter);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    background-color: white;

    &.visible { 
      opacity: 1;
    }

    &.gros_espace {
      text-align: center;

      :global(p) {
        font-size: 6.66vw;
        line-height: 1;
        font-weight: bold;
        text-transform: uppercase;
        margin: 0;
      }
    }

    &.gros_centre {
      text-align: center;
      justify-content: center;

      :global(p) {
        font-size: 6.66vw;
        line-height: 1;
        font-weight: bold;
        text-transform: uppercase;
        margin: 0;
      }
    }

    &.petit_centre {
      text-align: center;
      justify-content: center;

      :global(p) {
        font-size: 3.33vw;
        line-height: 1;
        font-weight: normal;
        text-transform: uppercase;
        margin: 0;
      }
    }
  }

  .spacer {
    height: 100vh;
  }

  figure {
    z-index: 1;
  }

  figure :global(img) {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
</style>