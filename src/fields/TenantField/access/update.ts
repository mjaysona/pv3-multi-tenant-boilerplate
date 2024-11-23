import type { FieldAccess } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getTenantAccessIDs } from '@/utilities/getTenantAccessIDs'

export const tenantFieldUpdate: FieldAccess = (args) => {
  const tenantIDs = getTenantAccessIDs(args.req.user)
  return Boolean(isSuperAdmin(args) || tenantIDs.length > 0)
}
