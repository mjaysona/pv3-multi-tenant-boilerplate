import type { Access } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getSelectedTenantId, getSelectedTenantToken } from '@/utilities/getSelectedTenant'
import { isAccessingViaSubdomain } from '@/collections/utilities/access/isAccessingViaSubdomain'

export const readByTenant: Access = async (args) => {
  const req = args.req
  const superAdmin = isSuperAdmin(req)
  const selectedTenant = getSelectedTenantId(req)

  if (await isAccessingViaSubdomain(req)) {
    return {
      and: [
        {
          'domains.domain': {
            equals: req.headers.get('host'),
          },
        },
      ],
    }
  }

  if (superAdmin) {
    return true
  }
}
