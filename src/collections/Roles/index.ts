import type { CollectionConfig } from 'payload'
import { noSpecialCharacters } from '../utilities/noSpecialCharacters'
import { propertyField } from '@/fields/Property'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { hasSuperAdminRole } from '@/utilities/getRole'
import { isTenantAdmin } from '../utilities/access/isTenantAdmin'

const Roles: CollectionConfig = {
  slug: 'roles',
  access: {
    create: ({ req }) => isSuperAdmin(req),
    read: ({ req }) => isSuperAdmin(req),
    update: ({ req }) => isSuperAdmin(req),
    delete: ({ req }) => isSuperAdmin(req),
  },
  admin: {
    useAsTitle: 'label',
    group: 'Super Admin',
    hidden: ({ user }) => !hasSuperAdminRole(user?.roles),
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
