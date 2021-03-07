const guestPerms = [
  '/',
  '/home',
  '/articles/search',
  '/auth/login',
  '/auth/signup'
]
const userPerms = [
  ...guestPerms,
  '/user/upload-articles'
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

