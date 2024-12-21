import type { CollectionConfig } from 'payload'

import { readAccess } from './access/read'
import { externalUsersLogin } from './endpoints/externalUsersLogin'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername'
import { setCookieBasedOnDomain } from './hooks/setCookieBasedOnDomain'
import { hasSuperAdminRole } from '@/utilities/getRole'
import { isSuperAdmin } from '../utilities/access/isSuperAdmin'
import { createAccess } from './access/create'
import { readUsers } from './access/readUsers'
import { isTenantAdmin } from '../utilities/access/isTenantAdmin'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: async ({ req }) => isSuperAdmin(req) || (await isTenantAdmin(req)),
    delete: async ({ req }) => isSuperAdmin(req) || (await isTenantAdmin(req)),
    read: readUsers,
    update: async ({ req }) => isSuperAdmin(req) || (await isTenantAdmin(req)),
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  endpoints: [externalUsersLogin],
  fields: [
    {
      label: 'Global Roles',
      name: 'roles',
      type: 'relationship',
      relationTo: 'roles',
      hasMany: true,
      required: true,
      admin: {
        condition: (_data, _siblingData, { user }) => Boolean(hasSuperAdminRole(user?.roles)),
        disableListColumn: true,
      },
    },
    {
      name: 'tenants',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'tenant',
          type: 'relationship',
          index: true,
          relationTo: 'tenants',
          required: true,
          saveToJWT: true,
        },
        {
          label: 'User Roles',
          name: 'roles',
          type: 'relationship',
          relationTo: 'tenant-roles',
          hasMany: true,
          required: true,
          filterOptions: ({ siblingData }) => {
            return {
              'tenant.id': { equals: siblingData?.tenant },
            }
          },
          admin: {
            condition: (_data, siblingData) => {
              return Boolean(siblingData.tenant)
            },
          },
        },
      ],
      saveToJWT: true,
    },
    {
      name: 'username',
      type: 'text',
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
      access: {
        read: () => false,
      },
      admin: {
        disableListColumn: true,
      },
    },
  ],
  // The following hook sets a cookie based on the domain a user logs in from.
  // It checks the domain and matches it to a tenant in the system, then sets
  // a 'payload-tenant' cookie for that tenant.

  // Uncomment this if you want to enable tenant-based cookie handling by domain.
  hooks: {
    afterLogin: [
      (args) => {
        return setCookieBasedOnDomain(args)
      },
    ],
  },
}

export default Users
