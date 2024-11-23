import type { CollectionConfig } from 'payload'
import { noSpecialCharacters } from '../utilities/noSpecialCharacters'
import { propertyField } from '@/fields/Property'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { tenantField } from '@/fields/TenantField'
import { filterByTenantRead } from './access/byTenant'

const TenantRoles: CollectionConfig = {
  slug: 'tenant-roles',
  labels: {
    singular: 'User Role',
    plural: 'User Roles',
  },
  access: {
    create: isSuperAdmin,
    read: filterByTenantRead,
    delete: isSuperAdmin,
    update: isSuperAdmin,
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
}

export default TenantRoles
