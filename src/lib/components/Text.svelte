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
    position: string
  }>

  export let visible = false
  export let root: HTMLElement = undefined
  let element: HTMLElement

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(node => {
          visible = node.isIntersecting
        })
      },
      { root }
    )

    observer.observe(element)

    return () => observer.disconnect()
  })
</script>

<section id={entry.fields.id}>
  {#if entry.fields.titre}<h6>{entry.fields.titre}</h6>{/if}
  {#if entry.fields.text}<div class:visible class="content {entry.fields.type?.toLowerCase().replace(' ', '_').replace('é', 'e')}"><Document body={entry.fields.text} /></div>{/if}
  <div class="spacer" bind:this={element} />
  {#if entry.fields.photo}<figure style={entry.fields.position && `--position: ${entry.fields.position};`}><Picture media={entry.fields.photo} /></figure>{/if}
</section>


<style lang="scss">
  .content {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    min-height: -webkit-fill-available;
    padding: calc(var(--gutter) * 0.8) var(--gutter);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // background-color: white;
    pointer-events: none;

    :global(*) {
      pointer-events: all;
    }

    visibility: hidden;

    :global(.popup) & {
      padding: calc(var(--gutter) * 1.5) calc(var(--gutter) * 1.5);
    }

    &.visible { 
      visibility: visible;
    }

    &.gros_espace {
      text-align: center;

      :global(p) {
        font-size: var(--huge);
        line-height: 1;
        font-weight: bold;
        text-transform: uppercase;
        margin: 0;
      }
    }

    &.gros_centre {
      text-align: justify;
      text-align-last: justify;
      justify-content: center;

      :global(p) {
        font-size: var(--huge);
        line-height: 1;
        font-weight: bold;
        text-transform: uppercase;
        margin: 0;

        &:after {
          content: "";
          display: inline-block;
          width: 100%;
          height: 0px;

          @media (max-width: 888px) {
            display: none;
          }
        }
      }
    }

    &.petit_centre {
      text-align: center;
      justify-content: center;
      padding: 0 calc(var(--gutter) * 4);

      @media (max-width: 888px) {
        padding: 0 calc(var(--gutter) * 3);
      }

      :global(p) {
        font-size: var(--small);
        line-height: 1;
        font-weight: normal;
        text-transform: uppercase;
        width: 62vw;
        margin: 0 auto;

        @media (max-width: 888px) {
          width: 100%;
        }
      }
    }
  }

  .spacer {
    height: 100vh;
  }

  figure {
    z-index: 2;
  }

  figure :global(img) {
    height: 100vh;
    width: 100%;
    object-fit: cover;
    background-color: black;
    object-position: var(--position);
  }
</style>