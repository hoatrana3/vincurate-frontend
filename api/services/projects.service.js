import {
  CREATE_PROJECT, GET_ARTICLE, GET_PROJECT, UPDATE_ARTICLE, UPDATE_PROJECT, UPDATE_PROJECT_ROLES
} from '@/api/ApiUrls'

export default ($axios) => ({
  createProject({ data }) {
    return $axios.post(CREATE_PROJECT.get(), data)
  },
  updateProject({ params, data }) {
    return $axios.patch(UPDATE_PROJECT.get(params), data)
  },
  fetchProject({ params }) {
    return $axios.get(GET_PROJECT.get(params))
  },
})
