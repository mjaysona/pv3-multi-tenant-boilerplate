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
      if (hasTenantSelected(req)) {
        return false
      }
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
    condition: ({ user }) => Boolean(hasSuperAdminRole(user?.roles)),
    position: 'sidebar',
  },
  filterOptions: ({ siblingData, user }) => {
    if (!hasSuperAdminRole(user?.roles)) {
      return {
        id: { equals: siblingData?.tenant },
      }
    }

    return true
  },
  hasMany: false,
  hooks: {
    beforeValidate: [autofillTenant],
  },
  index: true,
  relationTo: 'tenants',
}
