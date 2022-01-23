<script lang="ts">
  export let i: 'burger' | 'close' | 'top'
</script>

<svg viewBox="0 0 80 80">
  {#if i === 'burger'}
	<path d="M58.1934 29.0637H21.8066V33.6337H58.1934V29.0637Z" />
  <path d="M58.1934 39.2754H21.8066V43.8454H58.1934V39.2754Z" />
  <path d="M58.1934 49.4872H21.8066V54.0572H58.1934V49.4872Z" />
  {:else if i === 'top'}
  <path d="M52.4968 21.082H27.5033V25.652H40H52.4968V21.082Z" />
  <path d="M54.4862 40.1382L40 25.652L25.5138 40.1382L28.7452 43.3697L37.715 34.3999V62.0388H42.285V34.3999L51.2548 43.3697L54.4862 40.1382Z" />
  {:else if i === 'close'}
  <path d="M54.4804 31.0635L51.249 27.832L40 39.081L28.751 27.832L25.5196 31.0635L36.7686 42.3125L25.5196 53.5615L28.751 56.7929L40 45.5439L51.249 56.7929L54.4804 53.5615L43.2314 42.3125L54.4804 31.0635Z" />
  {/if}
</svg>

<style lang="scss">
  svg {
    width: 6.66vw;
    height: 6.66vw;

    @media (max-width: 888px) {
      width: 6.66vh;
      height: 6.66vh;
    }
  }

  // polygon,
  // rect,
  path {
    fill: currentColor;
  }
</style>
