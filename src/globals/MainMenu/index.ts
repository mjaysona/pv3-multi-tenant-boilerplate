import { type GlobalConfig, type User } from 'payload'
import { cookies as getCookies } from 'next/headers'

import TenantMainMenu from '@/collections/MainMenu'
import { getSelectedTenantId, getSelectedTenantToken } from '@/utilities/getSelectedTenant'
import { hasTenantSelected } from '@/fields/utilities/access/hasTenantSelected'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'

const MainMenu: GlobalConfig = {
  ...(TenantMainMenu as GlobalConfig),
  labels: {
    singular: 'Main Menu',
    plural: 'Main Menu',
  },
  slug: 'main-menu',
  access: {
    update: ({ req }) => Boolean(hasTenantSelected(req) && isSuperAdmin(req)),
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
        const cookies = await getCookies()
        const selectedTenantId = cookies.get('payload-tenant')?.value
        const tenantMainMenus = await req.payload.find({
          collection: 'tenant-main-menu',
          where: {
            tenant: {
              equals: selectedTenantId,
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
