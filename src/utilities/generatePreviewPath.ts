import type { CollectionSlug, PayloadRequest } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
}

type Props = {
  data: Record<string, unknown>
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = async ({ data, collection, slug, req }: Props) => {
  const path = `${collectionPrefixMap[collection]}/${slug}`
  const tenant = data?.tenant?.id

  const params = {
    slug,
    collection,
    path,
    tenant,
  }

  const host = req.headers.get('host')
  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.PROJECT_PRODUCTION_URL)
  const protocol = isProduction ? 'https:' : req.protocol

  const url = `${protocol}//${host}/next/preview?${encodedParams.toString()}`

  return url
}
