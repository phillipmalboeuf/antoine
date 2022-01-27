<script lang="ts">
  export let i: 'burger' | 'close' | 'top'
</script>

<svg viewBox="0 0 80 80">
  {#if i === 'burger'}
	<path d="M54.5 29.3H25.5V33.9001H54.5V29.3Z" />
  <path d="M54.5 39.5H25.5V44.1H54.5V39.5Z" />
  <path d="M54.5 49.7002H25.5V54.3002H54.5V49.7002Z" />
  {:else if i === 'top'}
  <path d="M52.4968 21.082H27.5033V25.652H40H52.4968V21.082Z" />
  <path d="M54.4862 40.1382L40 25.652L25.5138 40.1382L28.7452 43.3697L37.715 34.3999V62.0388H42.285V34.3999L51.2548 43.3697L54.4862 40.1382Z" />
  {:else if i === 'close'}
  <path d="M54.4804 31.0635L51.249 27.832L40 39.081L28.751 27.832L25.5196 31.0635L36.7686 42.3125L25.5196 53.5615L28.751 56.7929L40 45.5439L51.249 56.7929L54.4804 53.5615L43.2314 42.3125L54.4804 31.0635Z" />
  {/if}
</svg>

<style lang="scss">
  svg {
    width: var(--big);
    height: var(--big);

    // @media (max-width: 888px) {
    //   width: 6.66vh;
    //   height: 6.66vh;
    // }
  }

  // polygon,
  // rect,
  path {
    fill: currentColor;
  }
</style>
