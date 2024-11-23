import type { Field } from 'payload'
import { tenantFieldUpdate } from './access/update'
import { autofillTenant } from './hooks/autofillTenant'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { hasTenantSelected } from '../utilities/access/hasTenantSelected'

export const tenantField: Field = {
  name: 'tenant',
  type: 'relationship',
  access: {
    read: () => true,
    update: (access) => {
      if (hasTenantSelected(access)) {
        return false
      }
      if (isSuperAdmin(access)) {
        return true
      }
      return tenantFieldUpdate(access)
    },
  },
  admin: {
    components: {
      Field: '@/fields/TenantField/components/Field#TenantFieldComponent',
    },
    position: 'sidebar',
  },
  filterOptions: ({ relationTo, siblingData, user }) => {
    return {
      id: { equals: siblingData?.tenant },
    }
  },
  hasMany: false,
  hooks: {
    beforeValidate: [autofillTenant],
  },
  index: true,
  relationTo: 'tenants',
  required: true,
}
