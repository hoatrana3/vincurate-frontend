const guestPerms = [
  '',
  '/',
  '/home',
  '/articles',
  '/articles/:id',
  '/articles/explore',
  '/auth/login',
  '/auth/signup'
]
const userPerms = [
  ...guestPerms,
  '/articles/upload',
  '/articles/my-articles',
  '/user/edit-account',
  '/articles/:id/details',
  '/articles/:id?/details',
  '/articles/:id/edit-basic',
  '/articles/:id?edit-basic',
  '/articles/:id/curate-data',
  '/articles/:id?/curate-data',
  '/edit-versions/:id',
  '/projects/my-projects',
  '/projects/new',
  '/projects/:id',
  '/projects/:id/edit',
  '/projects/:id?/edit',
  '/projects/:id/upload-articles',
  '/projects/:id?/upload-articles',
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

