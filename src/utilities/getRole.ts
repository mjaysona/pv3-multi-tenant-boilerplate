import { User } from 'payload-types'
import { checkUserRoles } from './checkUserRoles'

export const hasAdminRole = (userRoles: User['roles']): boolean =>
  checkUserRoles(['admin'], userRoles, 'global')
export const hasSuperAdminRole = (userRoles: User['roles']): boolean =>
  checkUserRoles(['superAdmin'], userRoles, 'global')
export const hasTenantAdminRole = (userRoles: User['roles']): boolean =>
  checkUserRoles(['admin'], userRoles, 'tenant')
