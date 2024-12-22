import type { Access, Where } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getSelectedTenantId, getSelectedTenantToken } from '@/utilities/getSelectedTenant'
import { headers as getHeaders } from 'next/headers'
import { isAccessingViaSubdomain } from '@/collections/utilities/access/isAccessingViaSubdomain'
import { isTenantAdmin } from '@/collections/utilities/access/isTenantAdmin'

export const readPages: Access = async (args) => {
  const req = args.req
  const selectedTenant = getSelectedTenantId(req) || (await getSelectedTenantToken())
  const tenantHost = req.headers.get('host') || (await getHeaders()).get('host')
  const superAdmin = isSuperAdmin(req)

  if (selectedTenant) {
    if (!superAdmin && !(await isAccessingViaSubdomain(req))) return false

    const querySelectedTenant = {
      tenant: {
        equals: selectedTenant,
      },
    } as Where
    const queryActiveTenant = {
      'tenant.domains.domain': {
        equals: tenantHost,
      },
    } as Where

    if (isSuperAdmin(req)) {
      return {
        and: [querySelectedTenant],
      } as Where
    }

    if (await isTenantAdmin(req)) {
      return {
        and: [querySelectedTenant, queryActiveTenant],
      } as Where
    }

    return {
      and: [
        querySelectedTenant,
        queryActiveTenant,
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    } as Where
  }

  if (superAdmin) return true

  return {
    or: [
      {
        _status: {
          equals: 'published',
        },
      },
    ],
  }
}
