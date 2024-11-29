import { CollectionConfig } from 'payload'
import { propertyField } from '@/fields/Property'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { hasTenantSelected } from '@/fields/utilities/access/hasTenantSelected'

const Features: CollectionConfig = {
  admin: {
    useAsTitle: 'label',
    group: 'Super Admin',
  },
  slug: 'features',
  access: {
    create: ({ req }) => isSuperAdmin(req),
    read: ({ req }) => Boolean(!hasTenantSelected(req) && isSuperAdmin(req)),
    update: ({ req }) => isSuperAdmin(req),
    delete: ({ req }) => isSuperAdmin(req),
  },
  fields: [
    {
      name: 'label',
      label: 'Feature',
      type: 'text',
      required: true,
    },
    propertyField,
    {
      type: 'row',
      fields: [
        {
          name: 'isEnabled',
          type: 'checkbox',
          defaultValue: false,
          required: true,
          admin: {
            width: '140px',
          },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
          required: true,
        },
      ],
    },
  ],
}

export default Features
