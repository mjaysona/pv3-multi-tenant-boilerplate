import type { Access, Where } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getTenantAdminTenantAccessIDs } from '@/utilities/getTenantAccessIDs'
import { getSelectedTenantId } from '@/utilities/getSelectedTenant'
import { isAccessingViaSubdomain } from '@/collections/utilities/access/isAccessingViaSubdomain'

// add FieldAccess type
export const readAccess: Access = async (args) => {
  const { req } = args
  if (!req?.user) {
    return false
  }

  const superAdmin = isSuperAdmin(req)
  const selectedTenant = getSelectedTenantId(req)

  if (selectedTenant) {
    // If it's a super admin,
    // give them read access to only pages for that tenant
    if (superAdmin) {
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
      }
    }

    const tenantAccessIDs = getTenantAdminTenantAccessIDs(req.user)
    const hasTenantAccess = tenantAccessIDs.some((id) => id === selectedTenant)

    // If NOT super admin,
    // give them access only if they have access to tenant ID set in cookie

    if (hasTenantAccess) {
      if (await isAccessingViaSubdomain(req)) {
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
        }
      }

      return false
    }
  }

  if (superAdmin) {
    return true
  }

  const adminTenantAccessIDs = getTenantAdminTenantAccessIDs(req.user)

  return {
    'tenants.tenant': {
      in: adminTenantAccessIDs,
    },
  } as Where
}
