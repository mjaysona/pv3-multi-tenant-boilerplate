import type { CollectionConfig } from 'payload'
import { camelCaseFormat } from '../utilities/camelCaseFormat'
import { noSpecialCharacters } from '../utilities/noSpecialCharacters'
import { propertyField } from '@/fields/Property'

const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    useAsTitle: 'label',
    group: 'Super Admin',
  },
  fields: [
    {
      name: 'scope',
      label: 'Scope',
      type: 'radio',
      defaultValue: 'global',
      options: [
        {
          label: 'Global',
          value: 'global',
        },
        {
          label: 'Tenant',
          value: 'tenant',
        },
      ],
      required: true,
    },
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
