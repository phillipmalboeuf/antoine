<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from './Picture.svelte'
  import Icon from './Icon.svelte'
  import Contenu from './Contenu.svelte'

  export let entry: Entry<{
    titre: string
    id: string
    // photos: Asset[]
    realisations: Entry<{
      titre: string
      id: string
      photo: Asset
      contenu: Entry<any>[]
    }>[]
  }>

  export let visible = false
  let element: HTMLElement
  let root: HTMLElement

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

  let active: number = undefined

  function show(index: number) {
    active = index
    document.documentElement.classList.add('noscroll')
  }

  function hide() {
    active = undefined
    document.documentElement.classList.remove('noscroll')
  }
</script>

<section bind:this={element} id={entry.fields.id}>
  <div class:visible class="content">
    {#if entry.fields.titre}<h2>{entry.fields.titre}</h2>{/if}
  </div>

  <div class="spacer" />

  {#key visible}
  {#each entry.fields.realisations as realisation, index}
  <a href="#{realisation.fields.id}" on:click={e => {
    e.preventDefault()
    show(index)
  }}>
    <figure style="left: {Math.random()*66}%;">
      <Picture media={realisation.fields.photo} ar={9/16} small={entry.fields.realisations.length > 3} />
      <figcaption><h6>{realisation.fields.titre.replace(' / ', '\n')}</h6></figcaption>
    </figure>
  </a>
  {/each}
  {/key}
</section>

{#if active !== undefined}
<article class="popup" transition:fade >
  <button on:click={hide} />
  <button class="close" on:click={hide}><Icon i='close' /></button>
  <div bind:this={root}>
    {#key root}
    {#if root && entry.fields.realisations[active].fields.contenu}
    <Contenu contenu={entry.fields.realisations[active].fields.contenu} {root} />
    {/if}
    {/key}
  </div>
</article>
{/if}


<style lang="scss">
  section {
    padding: calc(var(--gutter) * 2);
  }

  a {
    pointer-events: none;
  }

  figure {
    // cursor: pointer;
    pointer-events: auto;
    width: 33vw;
    margin-bottom: calc(var(--gutter) * 1);
  }

  a:nth-child(3n) figure :global(img),
  a:nth-child(3n) figure :global(video) {
    position: relative;
    z-index: -1;
  }

  figcaption {
    text-align: center;
    opacity: 0;
    transition: opacity 666ms;
    margin-top: calc(var(--gutter) / 2);
  }

  a:hover figcaption,
  a:focus figcaption {
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    pointer-events: none;

    visibility: hidden;

    &.visible {
      visibility: visible;
    }
    
    :global(p),
    > h2 {
      font-size: var(--huge);
      line-height: 1;
      font-weight: bold;
      text-align: justify;
      text-align-last: justify;
      text-transform: uppercase;
      margin: 0;

      &:after {
        content: "";
        display: inline-block;
        width: 100%;
        height: 0px;
      }
    }
  }

  article {
    position: fixed;
    z-index: 88;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    padding: var(--gutter);
    background-color: var(--muted);
    
    button {
      position: fixed;
      z-index: 0;
      top: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
      background: transparent;
      border: none;

      &.close {
        font-size: 1em;
        z-index: 5;
        top: calc(var(--gutter)*1.1);
        right: calc(var(--gutter)*1.1);
        // background-color: white;
        width: auto;
        height: auto;
      }
    }

    div {
      position: relative;
      z-index: 4;
      background: white;
      border-radius: 2vw;
      height: calc(100vh - (var(--gutter) * 2));
      overflow-y: auto;
    }
  }
</style>