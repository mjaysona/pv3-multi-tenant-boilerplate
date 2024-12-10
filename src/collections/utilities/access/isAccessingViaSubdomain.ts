import type { PayloadRequest } from 'payload'

export const isAccessingViaSubdomain = (req: PayloadRequest) => {
  const host = req.headers.get('host')
  const subdomain = host?.split('.')[0]

  if (subdomain && subdomain !== 'www' && !subdomain.startsWith('localhost')) {
    return true
  }

  return false
}
