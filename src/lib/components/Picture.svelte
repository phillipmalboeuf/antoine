<script lang="ts">
  import type { Asset } from 'contentful'

  export let media: Asset
  export let small = false
  export let noDescription = false
  export let ar = undefined
  export let eager = false
</script>

<style lang="scss">
  img,
  video,
  audio {
    display: block;
    width: 100%;
  }

  small {
    display: block;
    margin-bottom: 1rem;
  }

  picture + small {
    text-align: right;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  video {
    max-height: 33vh;
    background-color: var(--color);
    border-radius: 12px;
  }
 
  audio::-webkit-media-controls-enclosure {
    background-color: var(--color);
  }
</style>

{#if media.fields.file.contentType.startsWith('video/')}
<!-- svelte-ignore a11y-media-has-caption -->
<video src="{media.fields.file.url}" controls />
{:else if media.fields.file.contentType.startsWith('audio/')}
<!-- {#if !noDescription && media.fields.description}
<small>{media.fields.description}</small>
{/if} -->
<!-- svelte-ignore a11y-media-has-caption -->
<audio src="{media.fields.file.url}" controls />
{:else}
<picture>
  {#if small}
<source srcSet="{media.fields.file.url}?w=400{ar ? `&h=${Math.round(ar * 400)}&fit=fill` : ''}&fm=avif" type="image/avif" media="(max-width: 900px)" />
<source srcSet="{media.fields.file.url}?w=400{ar ? `&h=${Math.round(ar * 400)}&fit=fill` : ''}" media="(max-width: 900px)" />
<source srcSet="{media.fields.file.url}?w=600{ar ? `&h=${Math.round(ar * 600)}&fit=fill` : ''}&fm=avif" type="image/avif" media="(max-width: 1200px)" />
<source srcSet="{media.fields.file.url}?w=600{ar ? `&h=${Math.round(ar * 600)}&fit=fill` : ''}" media="(max-width: 1200px)" />
<source srcSet="{media.fields.file.url}?w=800{ar ? `&h=${Math.round(ar * 800)}&fit=fill` : ''}&fm=avif" type="image/avif" />
<img src="{media.fields.file.url}?w=800{ar ? `&h=${Math.round(ar * 800)}&fit=fill` : ''}" alt="{media.fields.title} {media.fields.description}" loading={eager ? "eager" : "lazy"} />
  {:else}
<source srcSet="{media.fields.file.url}?h=900{ar ? `&w=${Math.round(ar * 900)}&fit=fill` : ''}&fm=avif" type="image/avif" media="(max-width: 900px)" />
<source srcSet="{media.fields.file.url}?h=900{ar ? `&w=${Math.round(ar * 900)}&fit=fill` : ''}" media="(max-width: 900px)" />
<source srcSet="{media.fields.file.url}?w=1200{ar ? `&h=${Math.round(ar * 1200)}&fit=fill` : ''}&fm=avif" type="image/avif" media="(max-width: 1200px)" />
<source srcSet="{media.fields.file.url}?w=1800{ar ? `&h=${Math.round(ar * 1800)}&fit=fill` : ''}&fm=avif" type="image/avif" />
<img style={ar && `aspect-ratio: 1800 / ${Math.round(ar * 1800)}`} src="{media.fields.file.url}?w=1800{ar ? `&h=${Math.round(ar * 1800)}&fit=fill` : ''}" alt="{media.fields.title} {media.fields.description}" loading={eager ? "eager" : "lazy"} />
  {/if}
</picture>

<!-- {#if !noDescription && media.fields.description}
<small>{media.fields.description}</small>
{/if} -->
{/if}

