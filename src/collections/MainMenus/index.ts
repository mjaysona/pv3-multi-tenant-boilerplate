import type { CollectionConfig, GlobalConfig } from 'payload'

import link from '@/fields/Link'
import { tenantField } from '@/fields/TenantField'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { filterByTenantRead } from '../access/byTenant'
import { hasSuperAdminRole } from '@/utilities/getRole'

const MainMenus: CollectionConfig = {
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
    useAsTitle: 'tenantName',
    hidden: true,
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
    {
      name: 'tenantName',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          async ({ siblingData }) => {
            delete siblingData.tenantName
          },
        ],
        afterRead: [
          async ({ siblingData, req: { payload } }) => {
            if (!siblingData?.tenant) return ''

            const tenant = await payload.findByID({
              collection: 'tenants',
              id:
                typeof siblingData.tenant === 'string'
                  ? siblingData.tenant
                  : siblingData.tenant?.id,
            })

            return tenant?.name
          },
        ],
      },
    },
  ],
}

export default MainMenus
