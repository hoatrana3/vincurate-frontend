import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  currentEditVersion: null,
  onlyShowDiff: true,
})

export const getters = {
  getCurrentEditVersion(state) {
    return state.currentEditVersion
  },
  getOnlyShowDiff(state) {
    return state.onlyShowDiff
  },
}

export const mutations = {
  setCurrentEditVersion(state, val) {
    state.currentEditVersion = val
  },
  setOnlyShowDiff(state, val) {
    state.onlyShowDiff = val
  },
}

export const actions = {
  async fetchEditVersion({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$editVersionsService.fetchEditVersion(
        handler.data
      )
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch article edit version details',
          response.getMessage()
        )
      } else {
        commit('setCurrentEditVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateEditVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$editVersionsService.updateEditVersion(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update edit version info',
          response.getMessage()
        )
      } else {
        commit('setCurrentEditVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async applyEditVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$editVersionsService.applyEditVersion(
        handler.data
      )
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to apply review edit version',
          response.getMessage()
        )
      } else {
        commit('setCurrentEditVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
}
