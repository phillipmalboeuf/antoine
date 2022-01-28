<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from './Picture.svelte'

  export let photos: Asset[]
  export let captions: string[]

  export let visible = false
  export let padded = false
  export let root: HTMLElement = undefined
  export let onClick: (index: number) => void = () => null
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

<section bind:this={element}>
  <div class:visible class:padded class="content">
    <slot name="content" />
  </div>

  <div class="spacer" />

  {#key visible}
  {#each photos as media, index}
  <button on:click={() => onClick(index)}>
    <figure style="margin-left: {Math.random()*66}%">
      <Picture {media} small={photos.length > 3} ar={9/16} />
      <figcaption>{#if captions[index]}<h6>{captions[index].replace(' / ', '\n')}</h6>{/if}</figcaption>
    </figure>
  </button>
  {/each}
  {/key}
</section>


<style lang="scss">
  section {
    padding: calc(var(--gutter) * 2);
  }

  button {
    display: block;
    pointer-events: none;

    &:last-child {
      margin-bottom: 50vh;
    }
  }

  figure {
    pointer-events: auto;
    cursor: pointer;
    width: 33vw;
    margin-bottom: calc(var(--gutter) * 2);
  }

  @media (max-width: 888px) {
    figure {
      width: 50vw;
    }
  }

  button:nth-child(3n) figure :global(img),
  button:nth-child(3n) figure :global(video) {
    position: relative;
    z-index: -1;
  }

  figcaption {
    text-align: center;
    opacity: 0;
    transition: opacity 666ms;
    margin-top: calc(var(--gutter) / 2);
  }

  button:hover figcaption,
  button:focus figcaption {
    opacity: 1;
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
    padding: var(--gutter);
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.padded {
      padding: calc(var(--gutter) * 2) calc(var(--gutter) * 3);
    }

    visibility: hidden;

    &.visible {
      visibility: visible;
    }

    > :global(p) {
      width: 62vw;
      margin: 0 auto;
      text-align: center;
      text-transform: uppercase;

      @media (max-width: 888px) {
        width: 100%;
      }
    }
  }
</style>