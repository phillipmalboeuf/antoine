import { createClient } from 'contentful'

export const contentful = createClient({
  space: 'hv3zvv3iozxk',
  accessToken: 'RwSSKvCyYfgJmuuktqVBsEndd3CzNUFo1hAwx_7K1uM',
})

const limit = 12

export async function entry<T>(id: string, locale: string, query: {[key: string]: any}={}, include=3) {
  return (await contentful.getEntry<T>(id, { include, locale: {'en': 'en-CA'}[locale], ...query }))
}

export async function entries<T>(content_type: string, locale: string, query: {[key: string]: any}={}, include=2, page=0) {
  return await contentful.getEntries<T>({ content_type, include, locale: {'en': 'en-CA'}[locale], ...query, limit, skip: limit*page })
}