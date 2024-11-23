import { Role, User } from 'payload-types'

export const checkUserRoles = (
  allRoles: User['roles'] = [],
  userRoles: User['roles'] = [],
  scope: Role['scope'],
): boolean => {
  if (
    allRoles.some((role) => {
      return userRoles?.some((individualRole) => {
        return (
          typeof individualRole !== 'string' &&
          individualRole.value === role &&
          individualRole.scope === scope
        )
      })
    })
  ) {
    return true
  }

  return false
}
