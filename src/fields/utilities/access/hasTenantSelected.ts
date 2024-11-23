import type { FieldAccess } from 'payload'
import { parseCookies } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'

export const hasTenantSelected: FieldAccess = (args) => {
  const { req } = args
  if (!req?.user) {
    return false
  }

  const cookies = parseCookies(req.headers)
  const superAdmin = isSuperAdmin(args)
  const selectedTenant = cookies.get('payload-tenant')

  if (superAdmin && selectedTenant) {
    return true
  }

  return false
}
