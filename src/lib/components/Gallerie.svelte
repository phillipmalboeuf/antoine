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
  let element: HTMLElement

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(node => {
          visible = node.isIntersecting
        })
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  })
</script>

<section bind:this={element} id={entry.fields.id}>
  <div class:visible class="content">
    {#if entry.fields.titre}<h2>{entry.fields.titre}</h2>{/if}
  </div>

  {#key visible}
  {#each entry.fields.photos as media, index}
  <figure style="margin-left: {Math.random()*66}vw;">
    <Picture {media} small={entry.fields.photos.length > 3} />
  </figure>
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

  .content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: calc(var(--gutter) * 2);
    display: flex;
    flex-direction: column;
    justify-content: center;

    visibility: hidden;

    &.visible {
      visibility: visible;
    }
  }
</style>