import { APPLY_CATEGORY_VERSION, GET_CATEGORY_VERSION, UPDATE_CATEGORY_VERSION } from '@/api/ApiUrls'

export default ($axios) => ({
  fetchCategoryVersion({ params }) {
    return $axios.get(GET_CATEGORY_VERSION.get(params))
  },
  updateCategoryVersion({ params, data }) {
    return $axios.patch(UPDATE_CATEGORY_VERSION.get(params), data)
  },
  applyCategoryVersion({ params, data }) {
    return $axios.post(APPLY_CATEGORY_VERSION.get(params), data)
  }
})
