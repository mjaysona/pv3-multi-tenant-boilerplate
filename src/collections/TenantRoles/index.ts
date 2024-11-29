import { type CollectionConfig } from 'payload'
import { noSpecialCharacters } from '../utilities/noSpecialCharacters'
import { propertyField } from '@/fields/Property'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { tenantField } from '@/fields/TenantField'
import { filterByTenantRead } from './access/byTenant'
import { autofillTenant } from '@/fields/TenantField/hooks/autofillTenant'
import { hasTenantSelected } from '@/fields/utilities/access/hasTenantSelected'
import { getTenantAccessIDs } from '@/utilities/getTenantAccessIDs'
import { getSelectedTenant } from '@/utilities/getSelectedTenant'
import { camelCaseFormat } from '../utilities/camelCaseFormat'

const TenantRoles: CollectionConfig = {
  slug: 'tenant-roles',
  labels: {
    singular: 'User Role',
    plural: 'User Roles',
  },
  access: {
    create: ({ req }) => isSuperAdmin(req),
    read: filterByTenantRead,
    delete: ({ req }) => isSuperAdmin(req),
    update: ({ req }) => isSuperAdmin(req),
  },
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      label: 'Role',
      type: 'text',
      required: true,
      validate: (value: string) => {
        return noSpecialCharacters(value)
      },
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
            tenant: getSelectedTenant(req),
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
