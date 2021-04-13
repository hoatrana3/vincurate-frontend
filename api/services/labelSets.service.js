import { CREATE_LABEL_SET, DELETE_LABEL_SET, GET_ALL_LABEL_SETS, GET_LABEL_SET, UPDATE_LABEL_SET } from '@/api/ApiUrls'

export default ($axios) => ({
  getAllLabelSets() {
    return $axios.get(GET_ALL_LABEL_SETS.get())
  },
  fetchLabelSet({ params }) {
    return $axios.get(GET_LABEL_SET.get(params))
  },
  createLabelSet({ data }) {
    return $axios.post(CREATE_LABEL_SET.get(), data)
  },
  updateLabelSet({ params, data }) {
    return $axios.patch(UPDATE_LABEL_SET.get(params), data)
  },
  deleteLabelSet({ params }) {
    return $axios.delete(DELETE_LABEL_SET.get(params))
  }
})
