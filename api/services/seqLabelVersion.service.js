import { APPLY_SEQ_LABEL_VERSION, GET_SEQ_LABEL_VERSION, UPDATE_SEQ_LABEL_VERSION } from '@/api/ApiUrls'

export default ($axios) => ({
  fetchSeqLabelVersion({ params }) {
    return $axios.get(GET_SEQ_LABEL_VERSION.get(params))
  },
  updateSeqLabelVersion({ params, data }) {
    return $axios.patch(UPDATE_SEQ_LABEL_VERSION.get(params), data)
  },
  applySeqLabelVersion({ params, data }) {
    return $axios.post(APPLY_SEQ_LABEL_VERSION.get(params), data)
  }
})
