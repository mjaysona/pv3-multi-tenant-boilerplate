import type { CollectionConfig } from 'payload'
import { canMutateTenant, filterByTenantRead } from './access/byTenant'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'

const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isSuperAdmin,
    delete: canMutateTenant,
    read: filterByTenantRead,
    update: canMutateTenant,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Super Admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domains',
      type: 'array',
      fields: [
        {
          name: 'domain',
          type: 'text',
          required: true,
        },
      ],
      index: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Used for url paths, example: /tenant-slug/page-slug',
      },
      index: true,
      required: true,
    },
    {
      name: 'public',
      type: 'checkbox',
      admin: {
        description: 'If checked, logging in is not required.',
        position: 'sidebar',
      },
      defaultValue: false,
      index: true,
    },
  ],
}

export default Tenants
