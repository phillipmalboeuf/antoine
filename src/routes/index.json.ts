import { contentful } from '$lib/clients/contentful'
import json from 'json-complete'

export async function get({ params }) {

	const [accueil] = await Promise.all([
    contentful.getEntry('3HVdZaC8yqINE0yEBiQ4C6', { include: 3 })
  ])


  return {
    body: json.encode({
      accueil,
      // accueil
    })
  }
}