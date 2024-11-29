import { User } from 'payload-types'
import { checkUserRoles } from './checkUserRoles'

export const hasAdminRole = (userRoles: User['roles']): boolean =>
  checkUserRoles(['admin'], userRoles)
export const hasSuperAdminRole = (userRoles: User['roles'] | undefined): boolean =>
  checkUserRoles(['superAdmin'], userRoles)
export const hasTenantAdminRole = (userRoles: User['roles']): boolean =>
  checkUserRoles(['admin'], userRoles)
