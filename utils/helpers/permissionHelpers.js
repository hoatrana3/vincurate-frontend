const guestPerms = [
  '/',
  '/home',
  '/articles',
  '/articles/explore',
  '/auth/login',
  '/auth/signup'
]
const userPerms = [
  ...guestPerms,
  '/articles/upload'
]
const adminPerms = [
  ...userPerms
]
const permissions = {
  guest: guestPerms,
  user: userPerms,
  admin: adminPerms
}

export default () => ({
  permissions,
  roleHasPermission(role, path) {
    if (!role || !role.length) return false
    if (!path || !path.length) return false
    if (!permissions.hasOwnProperty(role)) return false
    return permissions[role].includes(path)
  }
})

