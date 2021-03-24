import { GET_EDIT_VERSION } from '@/api/ApiUrls'

export default ($axios) => ({
  fetchEditVersion({ params }) {
    return $axios.get(GET_EDIT_VERSION.get(params))
  }
})
