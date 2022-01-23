<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from './Picture.svelte'

  export let entry: Entry<{
    titre: string
    id: string
    photos: Asset[]
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

<section bind:this={element} id={entry.fields.id}>
  <div class:visible class="content">
    {#if entry.fields.titre}<p>{entry.fields.titre}</p>{/if}
  </div>

  <div class="spacer" />

  {#key visible}
  {#each entry.fields.photos as media, index}
  <a href="{media.fields.file.url}" target="_blank">
    <figure style="margin-left: {Math.random()*66}%;">
      <Picture {media} small={entry.fields.photos.length > 3} />
    </figure>
  </a>
  {/each}
  {/key}
</section>


<style lang="scss">
  section {
    padding: calc(var(--gutter) * 2);
  }

  figure {
    cursor: pointer;
    width: 33vw;
    margin-bottom: calc(var(--gutter) * 2);
  }

  a:nth-child(3n) figure {
    z-index: -1;
  }

  .spacer {
    height: 100vh;
  }

  .content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: calc(var(--gutter) * 2) calc(var(--gutter) * 3);
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: center;

    visibility: hidden;

    &.visible {
      visibility: visible;
    }

    p {
      max-width: 66rem;
      margin: 0 auto;
      text-align: center;
      text-transform: uppercase;
    }
  }
</style>