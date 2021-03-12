import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  allLabels: []
})

export const getters = {
  getAllLabels(state) {
    return state.allLabels
  }
}

export const mutations = {
  setAllLabels(state, val) {
    state.allLabels = val
  }
}

export const actions = {
  async getAllLabels({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelsService.getAllLabels()
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to getl all labels',
          response.getMessage()
        )
      } else {
        commit('setAllLabels', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  }
}
