import type { CollectionConfig } from 'payload'
import { ensureUniqueSlug } from './hooks/ensureUniqueSlug'
import { tenantField } from '@/fields/TenantField'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { isTenantAdmin } from '../utilities/access/isTenantAdmin'
import richText from '@/fields/RichText'
import { formatSlug } from './hooks/formatSlug'
import { readPages } from './access/readPages'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: async ({ req }) => isSuperAdmin(req) || (await isTenantAdmin(req)),
    read: readPages,
    update: async ({ req }) => isSuperAdmin(req) || (await isTenantAdmin(req)),
    delete: async ({ req }) => isSuperAdmin(req) || (await isTenantAdmin(req)),
  },
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title'), ensureUniqueSlug],
      },
      index: true,
    },
    richText(),
    tenantField,
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}

export default Pages
