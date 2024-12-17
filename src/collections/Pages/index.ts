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

const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: ({ req }) => Boolean(isSuperAdmin(req) || isTenantAdmin(req)),
    read: (args) => {
      // when viewing pages inside the admin panel
      // restrict access to the ones your user has access to
      if (isPayloadAdminPanel(args.req)) {
        return filterByTenantRead(args)
      }

      // when viewing pages from outside the admin panel
      // you should be able to see your tenants and public tenants
      return externalReadAccess(args)
    },
    update: ({ req }) => Boolean(isSuperAdmin(req) || isTenantAdmin(req)),
    delete: ({ req }) => Boolean(isSuperAdmin(req) || isTenantAdmin(req)),
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
      required: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [ensureUniqueSlug],
      },
      index: true,
    },
    richText(),
    tenantField,
  ],
}

export default Pages
