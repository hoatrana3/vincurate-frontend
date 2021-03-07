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
          store.commit('users/setCurrentUser', response.getData())
          redirectIfInAuth()
        })
        .addOnError(noPermissionHandle)

      await store.dispatch('users/getUser', handler)
    } else {
      const path = route.path
      if (!path.includes('auth') && !$helpers.permissions.guest.includes(path))
        noPermissionHandle()
    }
  } else {
    const role = store.getters['users/getCurrentUser'].role
    const path = route.path

    if (!$helpers.roleHasPermission(role, path)) noPermissionHandle()
    else redirectIfInAuth()
  }
}
