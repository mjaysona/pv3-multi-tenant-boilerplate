import { Role, User } from 'payload-types'

export const checkUserRoles = (
  allRoles: User['roles'] = [],
  userRoles: User['roles'] = [],
): boolean => {
  if (
    allRoles.some((role) => {
      return userRoles?.some((individualRole) => {
        return typeof individualRole !== 'string' && individualRole.value === role
      })
    })
  ) {
    return true
  }

  return false
}
