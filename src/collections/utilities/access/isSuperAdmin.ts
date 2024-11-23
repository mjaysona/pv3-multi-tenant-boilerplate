import { hasSuperAdminRole } from '@/utilities/getRole'
import type { Access } from 'payload'

export const isSuperAdmin: Access = ({ req }) => {
  if (!req?.user) {
    return false
  }

  return Boolean(hasSuperAdminRole(req.user.roles))
}
