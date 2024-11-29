import type { Access } from 'payload'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { getSelectedTenant } from '@/utilities/getSelectedTenant'

export const hasDomainAccess: Access = (args) => {
  const req = args.req

  if (isSuperAdmin(req)) return true

  const { user } = req
  const tenantHost = req.headers.get('host')

  const selectedTenant = user?.tenants?.find(
    (tenant) => typeof tenant.tenant !== 'string' && tenant.tenant.id === getSelectedTenant(req),
  )
  const selectedTenantDomains =
    typeof selectedTenant?.tenant !== 'string' ? selectedTenant?.tenant.domains : []

  console.log('tenantHost', tenantHost)
  console.log('selectedTenantDomains', selectedTenantDomains)
  console.log(
    'hasDomainAccess',
    selectedTenantDomains?.some((td) => td.domain === tenantHost),
  )

  return Boolean(selectedTenantDomains?.some((td) => td.domain === tenantHost))
}
