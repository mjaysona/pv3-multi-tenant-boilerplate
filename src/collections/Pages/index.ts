import type { CollectionConfig } from 'payload'
import { isPayloadAdminPanel } from '../../utilities/isPayloadAdminPanel'
import { filterByTenantRead } from './access/byTenant'
import { externalReadAccess } from './access/externalReadAccess'
import { ensureUniqueSlug } from './hooks/ensureUniqueSlug'
import { tenantField } from '@/fields/TenantField'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { isTenantAdmin } from '../utilities/access/isTenantAdmin'
import richText from '@/fields/RichText'
import { formatSlug } from './hooks/formatSlug'
import { readPages } from './access/readPages'

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
}

export default Pages
