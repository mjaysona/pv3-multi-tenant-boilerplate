import type { PayloadRequest } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getSelectedTenant } from '@/utilities/getSelectedTenant'

export const hasTenantSelected = (req: PayloadRequest) => {
  if (!req?.user) {
    return false
  }

  const superAdmin = isSuperAdmin(req)
  const selectedTenant = getSelectedTenant(req)

  if (superAdmin && selectedTenant) {
    return true
  }

  return false
}
