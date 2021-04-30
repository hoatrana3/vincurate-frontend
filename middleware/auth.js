export default async function(
  {
    store,
    redirect,
    route,
    $storage,
    $apiHandler,
    $notify,
    $helpers
  }
) {
  const redirectIfInAuth = () => {
    if (route.path.includes('auth')) {
      $notify.primary(
        'You already logged in,',
        'Please log out if you want to use another account!'
      )
      redirect('/')
    }
  }
  const noPermissionHandle = () => {
    $notify.error(
      'Permission denied',
      'You are currently not allowed, please try again later!'
    )

    store.dispatch('users/logout')
  }
  const checkUserPermission = () => {
    const user = store.getters['users/getCurrentUser']

    if (!user || !user.isActive)
      noPermissionHandle()
    else {
      const role = user.role
      const path = route.matched[0].path || route.path

      if (!$helpers.hasPermission(path, role)) noPermissionHandle()
      else redirectIfInAuth()
    }
  }
  let isLoggedIn = store.getters['users/isLoggedIn']

  if (!isLoggedIn) {
    const storedToken = $storage.getToken()

    if (storedToken && storedToken.length) {
      store.commit('users/setCurrentToken', storedToken)

      const userId = store.getters['users/getCurrentUserId']
      const handler = $apiHandler
        .build()
        .setData({ params: [userId] })
        .addOnResponse((response) => {
          const user = response.getData()
          if (!user || !user.isActive)
            noPermissionHandle()
          else {
            store.commit('users/setCurrentUser', response.getData())
            redirectIfInAuth()
          }
        })
        .addOnError(noPermissionHandle)

      await store.dispatch('users/getUser', handler)
      checkUserPermission()
    } else {
      const path = route.matched[0].path || route.path
      if (!path.includes('auth') && !$helpers.hasPermission(path))
        noPermissionHandle()
    }
  } else checkUserPermission()
}
