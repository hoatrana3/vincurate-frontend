const guestRoutes = [
  '',
  '/',
  '/home',
  '/articles',
  '/guest/articles/:id',
  '/explore',
  '/auth/login',
  '/auth/signup'
]
const inheritDomains = {
  user: ['guest'],
  admin: ['guest', 'user']
}

export default () => ({
  hasPermission(path, role) {
    if (!path || !path.length) return false
    if (!role || !role.length) return guestRoutes.includes(path)
    if (guestRoutes.includes(path)) return true

    const routeRole = path.split('/')[1]
    return role === routeRole || inheritDomains[role].includes(routeRole)
  }
})
