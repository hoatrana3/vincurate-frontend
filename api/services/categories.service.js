import { CREATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORIES, GET_CATEGORY, UPDATE_CATEGORY } from '@/api/ApiUrls'

export default ($axios) => ({
  getAllCategories() {
    return $axios.get(GET_ALL_CATEGORIES.get())
  },
  fetchCategory({ params }) {
    return $axios.get(GET_CATEGORY.get(params))
  },
  createCategory({ data }) {
    return $axios.post(CREATE_CATEGORY.get(), data)
  },
  updateCategory({ params, data }) {
    return $axios.patch(UPDATE_CATEGORY.get(params), data)
  },
  deleteCategory({ params }) {
    return $axios.delete(DELETE_CATEGORY.get(params))
  }
})
