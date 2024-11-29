import { parseCookies, PayloadRequest } from 'payload'

export const getSelectedTenant = (req: PayloadRequest) => {
  const cookies = parseCookies(req.headers)
  const selectedTenant = cookies.get('payload-tenant')

  return selectedTenant
}
