import { hasTenantAdminRole } from '@/utilities/getRole'
import { getSelectedTenant } from '@/utilities/getSelectedTenant'
import type { PayloadRequest } from 'payload'

export const isTenantAdmin = async (req: PayloadRequest) => {
  if (!req?.user) {
    return false
  }

  const selectedTenant = await getSelectedTenant(req)

  return Boolean(hasTenantAdminRole(selectedTenant?.roles))
}
