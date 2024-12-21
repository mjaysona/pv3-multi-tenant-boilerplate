import type { Access, Where } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getSelectedTenantId, getSelectedTenantToken } from '@/utilities/getSelectedTenant'
import { headers as getHeaders } from 'next/headers'
import { isAccessingViaSubdomain } from '@/collections/utilities/access/isAccessingViaSubdomain'

export const readMedia: Access = async (args) => {
  const req = args.req
  const selectedTenant = getSelectedTenantId(req) || (await getSelectedTenantToken())
  const tenantHost = req.headers.get('host') || (await getHeaders()).get('host')
  const superAdmin = isSuperAdmin(req)

  if (selectedTenant) {
    if (!superAdmin && !(await isAccessingViaSubdomain(req))) return false

    if (isSuperAdmin(req)) {
      return {
        tenant: {
          equals: selectedTenant,
        },
      } as Where
    }

    return {
      and: [
        {
          tenant: {
            equals: selectedTenant,
          },
        },
        {
          'tenant.domains.domain': {
            equals: tenantHost,
          },
        },
      ],
    } as Where
  }

  if (superAdmin) return true

  return false
}
