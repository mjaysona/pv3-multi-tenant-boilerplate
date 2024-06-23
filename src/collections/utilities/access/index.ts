import { Access, AccessArgs, AccessResult } from 'payload'
import { isAdmin, isSuperAdmin } from '../../../utilities/getRole'

export const admin: Access = async ({ req: { user } }) => {
  if (user && isAdmin(user)) return true

  return false
}

export const superAdmin: Access = async ({ req: { user } }) => {
  if (user && isSuperAdmin(user)) return true

  return false
}
