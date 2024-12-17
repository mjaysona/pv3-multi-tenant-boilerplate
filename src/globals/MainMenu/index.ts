import { type GlobalConfig, type User } from 'payload'

import TenantMainMenu from '@/collections/MainMenu'
import { getSelectedTenantId, getSelectedTenantToken } from '@/utilities/getSelectedTenant'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { hasTenantAdminRole } from '@/utilities/getRole'
import { headers as getHeaders } from 'next/headers'

const MainMenu: GlobalConfig = {
  ...(TenantMainMenu as GlobalConfig),
  labels: {
    singular: 'Main Menu',
    plural: 'Main Menu',
  },
  slug: 'main-menu',
  access: {
    read: async ({ req }) => {
      const selectedTenantToken = await getSelectedTenantToken()
      const headers = await getHeaders()
      const tenants = req.user?.tenants || []
      const selectedTenant = tenants.find(
        ({ tenant }) => typeof tenant !== 'string' && tenant.id === selectedTenantToken,
      )
      const host = headers.get('host')
      const subdomain = host?.split('.')[0]

      const isAccessingViaSubdomain =
        subdomain && subdomain !== 'www' && !subdomain.startsWith('localhost')

      return Boolean(
        isSuperAdmin(req) || (hasTenantAdminRole(selectedTenant?.roles) && isAccessingViaSubdomain),
      )
    },
    update: async ({ req }) => {
      const selectedTenantToken = await getSelectedTenantToken()
      const headers = await getHeaders()
      const tenants = req.user?.tenants || []
      const selectedTenant = tenants.find(
        ({ tenant }) => typeof tenant !== 'string' && tenant.id === selectedTenantToken,
      )
      const host = headers.get('host')
      const subdomain = host?.split('.')[0]

      const isAccessingViaSubdomain =
        subdomain && subdomain !== 'www' && !subdomain.startsWith('localhost')

      return Boolean(
        isSuperAdmin(req) || (hasTenantAdminRole(selectedTenant?.roles) && isAccessingViaSubdomain),
      )
    },
  },
  admin: {
    hideAPIURL: true,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const selectedTenantId = getSelectedTenantId(req)
        const existingTenant = await req.payload.find({
          collection: 'tenant-main-menu',
          where: {
            tenant: {
              equals: selectedTenantId,
            },
          },
        })

        const docs = existingTenant.docs && existingTenant.docs[0]

        console.log('docs', docs)

        if (docs) {
          await req.payload.update({
            collection: 'tenant-main-menu',
            id: docs.id,
            data: {
              ...data,
              tenant: selectedTenantId,
              id: undefined,
              globalType: undefined,
            },
          })
        } else {
          await req.payload.create({
            collection: 'tenant-main-menu',
            data: {
              ...data,
              tenant: data.tenant,
              id: undefined,
              globalType: undefined,
            },
          })
        }

        return data
      },
    ],
    beforeRead: [
      async ({ req }) => {
        const selectedTenantToken = await getSelectedTenantToken()
        const tenantMainMenus = await req.payload.find({
          collection: 'tenant-main-menu',
          where: {
            tenant: {
              equals: selectedTenantToken,
            },
          },
        })
        const newDoc = tenantMainMenus.docs[0]

        return newDoc || {}
      },
    ],
  },
}

export default MainMenu
