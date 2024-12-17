import type { CollectionConfig, GlobalConfig } from 'payload'

import link from '@/fields/Link'
import { tenantField } from '@/fields/TenantField'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { filterByTenantRead } from '../access/byTenant'

const MainMenu: CollectionConfig = {
  slug: 'tenant-main-menu',
  labels: {
    singular: 'Main Menu',
    plural: 'Main Menus',
  },
  access: {
    create: ({ req }) => Boolean(isSuperAdmin(req)),
    read: (access) => filterByTenantRead(access),
    delete: ({ req }) => isSuperAdmin(req),
    update: ({ req }) => isSuperAdmin(req),
  },
  admin: {
    useAsTitle: 'tenant',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    tenantField,
  ],
}

export default MainMenu
