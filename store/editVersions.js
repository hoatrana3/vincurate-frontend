import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  currentEditVersion: null
})

export const getters = {
  getCurrentEditVersion(state) {
    return state.currentEditVersion
  }
}

export const mutations = {
  setCurrentEditVersion(state, val) {
    state.currentEditVersion = val
  }
}

export const actions = {
  async fetchEditVersion({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$editVersionsService.fetchEditVersion(handler.data)
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
  }
}
