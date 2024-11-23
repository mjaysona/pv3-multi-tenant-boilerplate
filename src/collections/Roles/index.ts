import type { CollectionConfig } from 'payload'
import { noSpecialCharacters } from '../utilities/noSpecialCharacters'
import { propertyField } from '@/fields/Property'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { hasTenantSelected } from '@/fields/utilities/access/hasTenantSelected'

const Roles: CollectionConfig = {
  slug: 'roles',
  access: {
    create: isSuperAdmin,
    read: (access) => Boolean(!hasTenantSelected(access) && isSuperAdmin(access)),
    update: isSuperAdmin,
    delete: isSuperAdmin,
  },
  admin: {
    useAsTitle: 'label',
    group: 'Super Admin',
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
  ],
}

export default Roles
