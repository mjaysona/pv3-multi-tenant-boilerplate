import { CollectionConfig } from 'payload'
import { readMedia } from './access/readMedia'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { isTenantAdmin } from '../utilities/access/isTenantAdmin'
import { tenantField } from '@/fields/TenantField'

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: async ({ req }) => isSuperAdmin(req) || (await isTenantAdmin(req)),
    read: readMedia,
    delete: async ({ req }) => isSuperAdmin(req) || (await isTenantAdmin(req)),
    update: async ({ req }) => isSuperAdmin(req) || (await isTenantAdmin(req)),
  },
  upload: true,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    tenantField,
  ],
}

export default Media
