<script lang="ts">
  import type { Entry } from 'contentful'

  import { onMount, getContext } from 'svelte'
  import { fade, fly } from 'svelte/transition'
import Document from './document/Document.svelte'

  import Icon from './Icon.svelte'
  import type { PageDocument } from './Page.svelte'

  export let page: Entry<PageDocument>

  let visible = false
  let scrolled = false
  let footer: HTMLDivElement

  // let locale = getContext('locale')

  onMount(() => {
		const scrolledObserver = new IntersectionObserver( 
			([e]) => scrolled = e.isIntersecting,
			{ threshold: 0.95 }
		)

		scrolledObserver.observe(footer)

    document.getElementById('main').addEventListener('click', () => visible = false, { passive: true, capture: false })
	})

  function toggle() {
    visible = !visible
    document.documentElement.classList.toggle('noscroll')
  }

  function hide() {
    visible = false
    document.documentElement.classList.remove('noscroll')
  }
</script>

<div bind:this={footer}>
  {#key visible}
  <footer class:visible transition:fly={{ y: 100 }}>
    {#if page.fields.titreDuMenu}<h1>{page.fields.titreDuMenu}</h1>{/if}
    {#if page.fields.contenuDuMenu}<div><Document body={page.fields.contenuDuMenu} /></div>{/if}
  </footer>
  {/key}
</div>

<header class:visible class:scrolled>
  {#if !visible && scrolled}
  <button on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <Icon i='top' />
  </button>
  {:else}
  <button on:click={toggle}>
    {#if visible}
    <Icon i='close' />
    {:else}
    <Icon i='burger' />
    {/if}
  </button>
  {/if}
</header>

<style lang="scss">
  header {
    button {
      z-index: 5;
      position: fixed;
      top: 0;
      right: 0;
      background: transparent;
      border: none;
      margin: -11.5vw;

      @media (max-width: 888px) {
        margin: -26.33vw;
      }
    }

    &.visible,
    &.scrolled {
      color: white;
    }
  }

  footer {
    position: relative;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;

    color: white;
    background: black;
    padding: var(--gutter);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    &.visible {
      position: fixed;
      top: 100%;
      transform: translateY(-100%);
    }

    div {
      text-align: center;
      text-transform: uppercase;

      :global(a) {
        text-decoration: none;
      }
    }
  }
</style>