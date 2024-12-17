import type { Access, User } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { isTenantAdmin } from '@/collections/utilities/access/isTenantAdmin'

export const createAccess: Access<User> = (args) => {
  const { req } = args
  if (!req.user) {
    return false
  }

  if (isSuperAdmin(req) || isTenantAdmin(req)) {
    return true
  }

  return false
}
