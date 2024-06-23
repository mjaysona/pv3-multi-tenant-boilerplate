import { User } from 'payload-types'
import { checkUserRoles } from './checkUserRoles'

export const isAdmin = (user: User): boolean => checkUserRoles(['admin'], user)
export const isSuperAdmin = (user: User): boolean => checkUserRoles(['super-admin'], user)
