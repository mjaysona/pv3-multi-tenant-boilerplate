import type { Access, Where } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getSelectedTenantId, getSelectedTenantToken } from '@/utilities/getSelectedTenant'
import { isAccessingViaSubdomain } from '@/collections/utilities/access/isAccessingViaSubdomain'
import { isTenantAdmin } from '@/collections/utilities/access/isTenantAdmin'

export const readUsers: Access = async (args) => {
  const req = args.req
  const selectedTenant = getSelectedTenantId(req) || (await getSelectedTenantToken())
  const superAdmin = isSuperAdmin(req)

  if (selectedTenant) {
    if (!superAdmin && !(await isAccessingViaSubdomain(req))) return false

    if (isSuperAdmin(req)) {
      return {
        and: [
          {
            'tenants.tenant': {
              equals: selectedTenant,
            },
          },
        ],
      } as Where
    }

    if (await isTenantAdmin(req)) {
      return {
        and: [
          {
            'tenants.tenant': {
              equals: selectedTenant,
            },
          },
          {
            'roles.value': {
              equals: 'user',
            },
          },
        ],
      } as Where
    }

    return {
      id: {
        equals: req?.user?.id,
      },
    } as Where
  }

  return false
}
