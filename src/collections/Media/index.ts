import { CollectionConfig } from 'payload'
import { hasDomainAccess } from '../utilities/access/hasDomainAccess'

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: (access) => hasDomainAccess(access),
  },
  upload: true,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
}

export default Media
