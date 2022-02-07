<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from './Picture.svelte'
  import Icon from './Icon.svelte'
  import Contenu from './Contenu.svelte'
  import Gallerie from './Gallerie.svelte'

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

  let root: HTMLElement
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

<Gallerie onClick={index => show(index)} photos={entry.fields.realisations.map(realisation => realisation.fields.photo)}
  captions={entry.fields.realisations.map(realisation => realisation.fields.titre)} {visible}>
  <h2 slot="content">{entry.fields.titre}</h2>
</Gallerie>

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
  h2 {
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

      @media (max-width: 888px) {
        display: none;
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