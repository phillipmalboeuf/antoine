<script lang="ts" context="module">
  import type { Asset, Entry, RichTextContent } from 'contentful'

	import { respond } from '$lib/responses'
	export async function load({ params, fetch, session, context }) {
		return respond(fetch, `/index.json`)
	}
</script>

<script lang="ts">
  import Page, { PageDocument } from '$lib/components/Page.svelte'
	import Menu from '$lib/components/Menu.svelte'

  export let accueil: Entry<PageDocument>
</script>

<Page page={accueil} />
<Menu page={accueil} />
