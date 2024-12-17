import type { Access } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getSelectedTenantId } from '@/utilities/getSelectedTenantId'

export const hasDomainAccess: Access = (args) => {
  const req = args.req

  if (isSuperAdmin(req)) return true

  const { user } = req
  const tenantHost = req.headers.get('host')

  const selectedTenant = user?.tenants?.find(
    (tenant) => typeof tenant.tenant !== 'string' && tenant.tenant.id === getSelectedTenantId(req),
  )
  const selectedTenantDomains =
    typeof selectedTenant?.tenant !== 'string' ? selectedTenant?.tenant.domains : []

  return Boolean(selectedTenantDomains?.some((td) => td.domain === tenantHost))
}
