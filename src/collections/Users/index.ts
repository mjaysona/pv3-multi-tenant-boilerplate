import { CollectionConfig } from 'payload'
import { admin, superAdmin } from '../utilities/access'

const Users: CollectionConfig = {
  admin: {
    group: 'Admin',
  },
  slug: 'users',
  auth: true,
  access: {
    update: superAdmin || admin,
    delete: superAdmin || admin,
  },
  fields: [
    {
      label: 'Role/s',
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Viewer',
          value: 'viewer',
        },
      ],
    },
    {
      label: 'Personal Information',
      name: 'personalInformation',
      type: 'group',
      fields: [
        {
          name: 'firstName',
          label: 'Name',
          type: 'text',
        },
        {
          name: 'lastName',
          label: 'Name',
          type: 'text',
        },
      ],
    },
  ],
}

export default Users
