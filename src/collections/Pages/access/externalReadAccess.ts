import type { Access, Where } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getTenantAccessIDs } from '@/utilities/getTenantAccessIDs'
import { getSelectedTenantId } from '@/utilities/getSelectedTenant'
import { isAccessingViaSubdomain } from '@/collections/utilities/access/isAccessingViaSubdomain'

export const externalReadAccess: Access = (args) => {
  const req = args.req
  const superAdmin = isSuperAdmin(req)
  const selectedTenant = getSelectedTenantId(req)
  const tenantHost = req.headers.get('host')
  const tenantAccessIDs = getTenantAccessIDs(req.user)

  const publicPageConstraint: Where = {
    'tenant.public': {
      equals: true,
    },
  }

  // First check for manually selected tenant from cookies
  if (selectedTenant) {
    // If it's a super admin,
    // give them read access to only pages for that tenant
    if (superAdmin) {
      return {
        and: [
          // publicPageConstraint,
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
      }
    }

    const hasTenantAccess = tenantAccessIDs.some((id) => id === selectedTenant)

    // If NOT super admin,
    // give them access only if they have access to tenant ID set in cookie
    if (hasTenantAccess) {
      if (isAccessingViaSubdomain(req)) {
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
        }
      }

      return false
    }
  }

  // If no manually selected tenant,
  // but it is a super admin, give access to all
  if (superAdmin) {
    return true
  }

  // If not super admin,
  // but has access to tenants,
  // give access to only their own tenants
  if (tenantAccessIDs.length) {
    return {
      or: [
        publicPageConstraint,
        {
          tenant: {
            in: tenantAccessIDs,
          },
        },
      ],
    }
  }

  // Allow access to public pages
  // return publicPageConstraint
}
