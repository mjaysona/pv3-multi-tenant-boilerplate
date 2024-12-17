import type { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (!value) {
      if (typeof value === 'string') {
        return format(value)
      }

      if (operation === 'create') {
        const fallbackData = data?.[fallback] || originalDoc?.[fallback]

        if (fallbackData && typeof fallbackData === 'string') {
          return format(fallbackData)
        }
      }

      return value
    }
  }
