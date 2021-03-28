import { CREATE_LABEL, DELETE_LABEL, GET_ALL_LABELS, GET_LABEL, UPDATE_LABEL } from '@/api/ApiUrls'

export default ($axios) => ({
  getAllLabels() {
    return $axios.get(GET_ALL_LABELS.get())
  },
  fetchLabel({ params }) {
    return $axios.get(GET_LABEL.get(params))
  },
  createLabel({ data }) {
    return $axios.post(CREATE_LABEL.get(), data)
  },
  updateLabel({ params, data }) {
    return $axios.patch(UPDATE_LABEL.get(params), data)
  },
  deleteLabel({ params }) {
    return $axios.delete(DELETE_LABEL.get(params))
  }
})
