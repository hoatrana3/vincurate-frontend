import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  currentCategoryVersion: null,
  onlyShowDiff: true,
})

export const getters = {
  getCurrentCategoryVersion(state) {
    return state.currentCategoryVersion
  },
  getOnlyShowDiff(state) {
    return state.onlyShowDiff
  },
}

export const mutations = {
  setCurrentCategoryVersion(state, val) {
    state.currentCategoryVersion = val
  },
  setOnlyShowDiff(state, val) {
    state.onlyShowDiff = val
  },
}

export const actions = {
  async fetchCategoryVersion({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$categoryVersionsService.fetchCategoryVersion(
        handler.data
      )
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch article category version details',
          response.getMessage()
        )
      } else {
        commit('setCurrentCategoryVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateCategoryVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$categoryVersionsService.updateCategoryVersion(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update category version info',
          response.getMessage()
        )
      } else {
        commit('setCurrentCategoryVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async applyCategoryVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$categoryVersionsService.applyCategoryVersion(
        handler.data
      )
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to apply review category version',
          response.getMessage()
        )
      } else {
        commit('setCurrentCategoryVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
}
