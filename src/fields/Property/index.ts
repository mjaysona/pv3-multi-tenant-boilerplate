import { camelCaseFormat } from '@/collections/utilities/camelCaseFormat'
import type { Field } from 'payload'

export const propertyField: Field = {
  name: 'value',
  type: 'text',
  admin: {
    readOnly: true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        return camelCaseFormat(data?.label)
      },
    ],
  },
}
