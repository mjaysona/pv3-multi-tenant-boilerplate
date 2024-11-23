import type { Access } from 'payload'
import { isAccessingSelf } from './isAccessingSelf'
import { isSuperAdmin } from '@/collections/utilities/access/isSuperAdmin'

export const isSuperAdminOrSelf: Access = (args) => isSuperAdmin(args) || isAccessingSelf(args)
