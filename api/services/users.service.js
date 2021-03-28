import {
  AUTHENTICATE_USER, GET_ALL_USERS,
  GET_USER, GET_USER_ARTICLES, GET_USER_LABELS, GET_USER_PROJECTS,
  REGISTER_USER,
  UPDATE_USER
} from '@/api/ApiUrls'

export default ($axios) => ({
  getAllUsers() {
    return $axios.get(GET_ALL_USERS.get())
  },
  registerUser({ data }) {
    return $axios.post(REGISTER_USER.get(), data)
  },
  authenticateUser({ data }) {
    return $axios.post(AUTHENTICATE_USER.get(), data)
  },
  getUser({ params }) {
    return $axios.get(GET_USER.get(params))
  },
  updateUser({ params, data }) {
    return $axios.patch(UPDATE_USER.get(params), data)
  },
  getUserArticles({ params }) {
    return $axios.get(GET_USER_ARTICLES.get(params))
  },
  getUserProjects({ params }) {
    return $axios.get(GET_USER_PROJECTS.get(params))
  },
  getUserLabels({ params }) {
    return $axios.get(GET_USER_LABELS.get(params))
  }
})
