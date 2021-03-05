import {
  AUTHENTICATE_USER,
  GET_USER,
  REGISTER_USER,
  UPDATE_USER,
} from '@/api/ApiUrls'

export default ($axios) => ({
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
    return $axios.put(UPDATE_USER.get(params), data)
  },
})
