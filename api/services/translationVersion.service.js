import { APPLY_TRANSLATION_VERSION, GET_TRANSLATION_VERSION, UPDATE_TRANSLATION_VERSION } from '@/api/ApiUrls'

export default ($axios) => ({
  fetchTranslationVersion({ params }) {
    return $axios.get(GET_TRANSLATION_VERSION.get(params))
  },
  updateTranslationVersion({ params, data }) {
    return $axios.patch(UPDATE_TRANSLATION_VERSION.get(params), data)
  },
  applyTranslationVersion({ params, data }) {
    return $axios.post(APPLY_TRANSLATION_VERSION.get(params), data)
  }
})
