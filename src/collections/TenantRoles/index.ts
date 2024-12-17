import { type CollectionConfig } from 'payload'
import { noSpecialCharacters } from '../utilities/noSpecialCharacters'
import { propertyField } from '@/fields/Property'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { tenantField } from '@/fields/TenantField'
import { filterByTenantRead } from './access/byTenant'
import { hasTenantSelected } from '@/fields/utilities/access/hasTenantSelected'
import { getSelectedTenantId } from '@/utilities/getSelectedTenant'
import { camelCaseFormat } from '../utilities/camelCaseFormat'
import { hasSuperAdminRole } from '@/utilities/getRole'
import { isTenantAdmin } from '../utilities/access/isTenantAdmin'

const TenantRoles: CollectionConfig = {
  slug: 'tenant-roles',
  labels: {
    singular: 'User Role',
    plural: 'User Roles',
  },
  access: {
    create: ({ req }) => Boolean(isSuperAdmin(req) || isTenantAdmin(req)),
    read: (access) => filterByTenantRead(access),
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
