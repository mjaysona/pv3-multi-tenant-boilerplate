import { type CollectionConfig } from 'payload'
import { noSpecialCharacters } from '../utilities/noSpecialCharacters'
import { propertyField } from '@/fields/Property'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { tenantField } from '@/fields/TenantField'
import { hasTenantSelected } from '@/fields/utilities/access/hasTenantSelected'
import { getSelectedTenantId, getSelectedTenantToken } from '@/utilities/getSelectedTenant'
import { camelCaseFormat } from '../utilities/camelCaseFormat'
import { readTenantRoles } from './access/readTenantRoles'
import { hasSuperAdminRole, hasTenantAdminRole } from '@/utilities/getRole'

const TenantRoles: CollectionConfig = {
  slug: 'tenant-roles',
  labels: {
    singular: 'User Role',
    plural: 'User Roles',
  },
  access: {
    create: ({ req }) => isSuperAdmin(req),
    read: readTenantRoles,
    delete: ({ req }) => isSuperAdmin(req),
    update: ({ req }) => isSuperAdmin(req),
  },
  admin: {
    useAsTitle: 'label',
    hidden: ({ user }) => {
      const isTenantAdmin = user?.tenants?.some((tenant) => hasTenantAdminRole(tenant?.roles))

      return !hasSuperAdminRole(user?.roles) && !isTenantAdmin
    },
  },
  fields: [
    {
      name: 'label',
      label: 'Role',
      type: 'text',
      required: true,
      validate: (value: string) => noSpecialCharacters(value),
    },
    propertyField,
    tenantField,
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (hasTenantSelected(req)) {
          return {
            ...data,
            value: camelCaseFormat(data?.label),
            tenant: getSelectedTenantId(req),
          }
        }

        return {
          ...data,
          value: camelCaseFormat(data?.label),
        }
      },
    ],
  },
}

export default TenantRoles
