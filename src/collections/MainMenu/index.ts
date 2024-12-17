import type { CollectionConfig, GlobalConfig } from 'payload'

import link from '@/fields/Link'
import { tenantField } from '@/fields/TenantField'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { filterByTenantRead } from '../access/byTenant'
import { hasSuperAdminRole } from '@/utilities/getRole'
import { isTenantAdmin } from '../utilities/access/isTenantAdmin'

const MainMenu: CollectionConfig = {
  slug: 'tenant-main-menu',
  labels: {
    singular: 'Main Menu',
    plural: 'Main Menus',
  },
  access: {
    create: ({ req }) => isSuperAdmin(req),
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
