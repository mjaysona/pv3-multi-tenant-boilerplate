import type { Access, Where } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { isAccessingViaSubdomain } from '@/collections/utilities/access/isAccessingViaSubdomain'
import { headers as getHeaders } from 'next/headers'

export const readTenants: Access = async (args) => {
  const req = args.req
  const superAdmin = isSuperAdmin(req)

  if (await isAccessingViaSubdomain(req)) {
    return {
      and: [
        {
          'domains.domain': {
            equals: req.headers.get('host') || (await getHeaders()).get('host'),
          },
        },
      ],
    } as Where
  }

  if (superAdmin) {
    return true
  }

  return false
}
