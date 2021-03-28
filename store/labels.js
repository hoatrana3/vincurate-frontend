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
          'Failed to get all labels',
          response.getMessage()
        )
      } else {
        commit('setAllLabels', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async fetchLabel({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelsService.fetchLabel(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch label details',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async createLabel({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelsService.createLabel(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to create new label',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateLabel({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelsService.updateLabel(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update label info',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async deleteLabel({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelsService.deleteLabel(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to delete label',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
}
