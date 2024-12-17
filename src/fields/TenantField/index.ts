import type { Field } from 'payload'
import { tenantFieldUpdate } from './access/update'
import { autofillTenant } from './hooks/autofillTenant'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { hasTenantSelected } from '../utilities/access/hasTenantSelected'
import { hasSuperAdminRole } from '@/utilities/getRole'

export const tenantField: Field = {
  name: 'tenant',
  type: 'relationship',
  required: true,
  access: {
    read: ({ req }) => {
      if (isSuperAdmin(req)) {
        return true
      }
      return tenantFieldUpdate(req)
    },
    update: ({ req }) => {
      if (hasTenantSelected(req)) {
        return false
      }
      if (isSuperAdmin(req)) {
        return true
      }
      return tenantFieldUpdate(req)
    },
  },
  admin: {
    components: {
      Field: '@/fields/TenantField/components/Field#TenantFieldComponent',
    },
    condition: (_data, _siblingData, { user }) => {
      return Boolean(hasSuperAdminRole(user?.roles))
    },
    position: 'sidebar',
  },
  hasMany: false,
  hooks: {
    beforeValidate: [autofillTenant],
  },
  index: true,
  relationTo: 'tenants',
}
