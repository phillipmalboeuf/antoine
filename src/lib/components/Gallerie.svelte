<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import type { Asset, Entry, RichTextContent } from 'contentful'
  import Picture from './Picture.svelte'
  // import Slider from './Slider.svelte'
  // import I from '../icons/I.svelte'

  export let entry: Entry<{
    titre: string
    id: string
    photos: Asset[]
  }>

  // let showSlider: number = undefined

  // function show(index: number) {
  //   showSlider = index
  //   document.documentElement.classList.toggle('noscroll')
  // }

  // function hide() {
  //   showSlider = undefined
  //   document.documentElement.classList.remove('noscroll')
  // }
</script>

<section id={entry.fields.id}>
  {#if entry.fields.titre}<h5>{entry.fields.titre}</h5>{/if}

  {#each entry.fields.photos as media, index}
  <figure>
    <Picture {media} small={entry.fields.photos.length > 3} />
  </figure>
  {/each}
</section>

<!-- {#if showSlider != undefined}
<aside transition:fade>
  <button on:click={hide} />
  <button class="close" on:click={hide}>Fermer <I i='close' /></button>
  <div transition:fly={{ y: 100 }}>
    <Slider initialPageIndex={showSlider} slider={{ fields: {
      // @ts-ignore
      slides: gallerie.fields.photos.map(media => ({
        fields: {
          media
        }
      }))
    } }} />
  </div>
</aside>
{/if} -->

<style lang="scss">
  figure {
    cursor: pointer;
    margin-bottom: var(--s1);
  }

  // aside {
  //   position: fixed;
  //   z-index: 88;
  //   top: 0;
  //   left: 0;
  //   width: 100vw;
  //   height: 100vh;
  //   overflow-y: auto;
  //   padding: var(--margins);
  //   background-color: var(--mutedlight);

  //   button {
  //     position: absolute;
  //     top: 0;
  //     right: 0;
  //     width: 100vw;
  //     height: 100vh;
  //     background: transparent;
  //     border: none;

  //     &.close {
  //       font-size: 1em;
  //       top: var(--s5);
  //       z-index: 2;
  //       right: 0.5em;
  //       // background-color: white;
  //       width: auto;
  //       height: auto;
  //     }
  //   }
  // }

  // figure :global(img) {
  //   height: 25vw;
  //   object-fit: cover;
  // }

  // section.Moyen figure :global(img) {
  //   height: 50vw;
  // }

  // section.Grand figure :global(img) {
  //   height: 75vw;
  // }
</style>