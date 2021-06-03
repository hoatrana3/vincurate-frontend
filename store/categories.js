import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  allCategories: [],
  openNewCategoryModal: false,
})

export const getters = {
  getAllCategories(state) {
    return state.allCategories
  },
   isOpenNewCategoryModal(state) {
    return state.openNewCategoryModal
  }
}

export const mutations = {
  setAllCategories(state, val) {
    state.allCategories = val
  },
  setOpenNewCategoryModal(state, val) {
    state.openNewCategoryModal = val
  }
}

export const actions = {
  async getAllCategories({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$categoriesService.getAllCategories()
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to get all categories',
          response.getMessage()
        )
      } else {
        commit('setAllCategories', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async fetchCategory({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$categoriesService.fetchCategory(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch category details',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async createCategory({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$categoriesService.createCategory(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to create new category',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateCategory({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$categoriesService.updateCategory(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update category info',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async deleteCategory({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$categoriesService.deleteCategory(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to delete category',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
}
