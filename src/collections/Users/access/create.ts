import type { Access, User } from 'payload'
import { getTenantAdminTenantAccessIDs } from '../../../utilities/getTenantAccessIDs'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'

export const createAccess: Access<User> = (args) => {
  const { req } = args
  if (!req.user) {
    return false
  }

  if (isSuperAdmin(args)) {
    return true
  }

  const adminTenantAccessIDs = getTenantAdminTenantAccessIDs(req.user)

  if (adminTenantAccessIDs.length > 0) {
    return true
  }

  return false
}
