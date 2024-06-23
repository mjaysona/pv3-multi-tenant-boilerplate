import { CollectionConfig } from 'payload/types'

const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
}

export default Media
