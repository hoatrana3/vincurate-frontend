import { APPLY_EDIT_VERSION, GET_EDIT_VERSION, UPDATE_EDIT_VERSION } from '@/api/ApiUrls'

export default ($axios) => ({
  fetchEditVersion({ params }) {
    return $axios.get(GET_EDIT_VERSION.get(params))
  },
  updateEditVersion({ params, data }) {
    return $axios.patch(UPDATE_EDIT_VERSION.get(params), data)
  },
  applyEditVersion({ params, data }) {
    return $axios.post(APPLY_EDIT_VERSION.get(params), data)
  }
})
