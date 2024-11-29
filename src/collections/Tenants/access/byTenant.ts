import type { Access } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getTenantAccessIDs } from '@/utilities/getTenantAccessIDs'

export const filterByTenantRead: Access = (args) => {
  const req = args.req

  // Super admin can read all
  if (isSuperAdmin(req)) {
    return true
  }

  const tenantIDs = getTenantAccessIDs(req.user)

  // Allow public tenants to be read by anyone
  const publicConstraint = {
    public: {
      equals: true,
    },
  }

  // If a user has tenant ID access,
  // return constraint to allow them to read those tenants
  if (tenantIDs.length) {
    return {
      or: [
        publicConstraint,
        {
          id: {
            in: tenantIDs,
          },
        },
      ],
    }
  }

  return publicConstraint
}

export const canMutateTenant: Access = (args) => {
  const req = args.req
  const superAdmin = isSuperAdmin(req)

  if (!req.user) {
    return false
  }

  // super admins can mutate pages for any tenant
  if (superAdmin) {
    return true
  }

  return false

  // Uncomment this code to allow tenant admins to mutate their own tenant
  // return {
  //   id: {
  //     in:
  //       req.user?.tenants
  //         ?.map(({ roles, tenant }) =>
  //           roles?.includes('tenant-admin')
  //             ? tenant && (typeof tenant === 'string' ? tenant : tenant.id)
  //             : null,
  //         )
  //         .filter(Boolean) || [],
  //   },
  // }
}
