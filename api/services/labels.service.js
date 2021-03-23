import {
  GET_ALL_LABELS
} from '@/api/ApiUrls'

export default ($axios) => ({
  getAllLabels() {
    return $axios.get(GET_ALL_LABELS.get())
  }
})
