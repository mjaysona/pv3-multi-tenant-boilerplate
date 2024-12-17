import { camelCaseFormat } from '@/collections/utilities/camelCaseFormat'
import type { Field } from 'payload'
import { hasTenantSelected } from '../utilities/access/hasTenantSelected'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'
import { tenantFieldUpdate } from '../TenantField/access/update'
import { hasSuperAdminRole } from '@/utilities/getRole'

export const propertyField: Field = {
  name: 'value',
  type: 'text',
  required: true,
  access: {
    read: ({ req }) => {
      if (isSuperAdmin(req)) {
        return true
      }
      if (hasTenantSelected(req)) {
        return false
      }
      return tenantFieldUpdate(req)
    },
    update: ({ req }) => {
      if (isSuperAdmin(req)) {
        return true
      }
      if (hasTenantSelected(req)) {
        return false
      }
      return tenantFieldUpdate(req)
    },
  },
  admin: {
    condition: (_data, _siblingData, { user }) => Boolean(hasSuperAdminRole(user?.roles)),
    readOnly: true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        return camelCaseFormat(data?.label)
      },
    ],
  },
}
