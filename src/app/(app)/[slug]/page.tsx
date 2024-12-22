import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { cache, Fragment } from 'react'

import type { Page as PageType } from '../../../../payload-types'

import config from '../../../../payload.config'
import { Gutter } from '../_components/Gutter'
import RichText from '../_components/RichText'
import classes from './index.module.scss'
import { home as homeStatic } from '../../../seed/home'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    // overrideAccess: false,
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params || []
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

interface PageParams {
  params: Promise<{
    slug?: string
  }>
}

// eslint-disable-next-line no-restricted-exports
export default async function Page({ params: paramsPromise }: PageParams) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise

  let page: null | PageType

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (page === null) {
    return notFound()
  }

  return (
    <Fragment>
      {draft && <LivePreviewListener />}
      <main className={classes.page}>
        <Gutter>
          <h1>{page?.title}</h1>
          <RichText content={page?.richText} />
        </Gutter>
      </main>
    </Fragment>
  )
}
