import { User } from 'payload-types'
import { hasTenantAdminRole } from './getRole'

export const getTenantAccessIDs = (user: null | User): string[] => {
  if (!user) {
    return []
  }
  return (
    user?.tenants?.reduce((acc: string[], { tenant }) => {
      if (tenant) {
        acc.push(typeof tenant === 'string' ? tenant : tenant.id)
      }
      return acc
    }, []) || []
  )
}

export const getTenantAdminTenantAccessIDs = (user: null | User): string[] => {
  if (!user) {
    return []
  }

  return (
    user?.tenants?.reduce((acc: string[], { roles, tenant }) => {
      if (tenant) {
        acc.push(typeof tenant === 'string' ? tenant : tenant.id)
      }
      return acc
    }, []) || []
  )
}
