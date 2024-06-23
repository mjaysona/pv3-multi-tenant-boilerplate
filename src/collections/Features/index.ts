import { CollectionConfig } from 'payload'
import { admin, superAdmin } from '../utilities/access'

const Features: CollectionConfig = {
  admin: {
    group: 'Super Admin',
  },
  slug: 'features',
  access: {
    create: superAdmin,
    read: superAdmin || admin,
    update: superAdmin,
    delete: superAdmin,
  },
  fields: [
    {
      name: 'feature',
      label: 'Feature',
      type: 'text',
      required: true,
    },
    {
      name: 'isEnabled',
      label: 'Is Enabled?',
      type: 'checkbox',
      required: true,
    },
  ],
}

export default Features
