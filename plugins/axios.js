export default ({ $axios, redirect, store, route }) => {
  $axios.onRequest((config) => {
    const token = store.getters['users/getToken']
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401 && !route.path.includes('auth')) {
      redirect('/auth/login')
    }
    return error.response
  })
}
