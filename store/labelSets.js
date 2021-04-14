import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  allLabelSets: [],
  currentLabelSet: null
})

export const getters = {
  getAllLabelSets(state) {
    return state.allLabelSets
  },
  getCurrentLabelSet(state) {
    return state.currentLabelSet
  }
}

export const mutations = {
  setAllLabelSets(state, val) {
    state.allLabelSets = val
  },
  setCurrentLabelSet(state, val) {
    state.currentLabelSet = val
  }
}

export const actions = {
  async getAllLabelSets({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelSetsService.getAllLabelSets()
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to get all label sets',
          response.getMessage()
        )
      } else {
        commit('setAllLabelSets', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async fetchLabelSet({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelSetsService.fetchLabelSet(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch label set details',
          response.getMessage()
        )
      } else {
        commit('setCurrentLabelSet', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async createLabelSet({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelSetsService.createLabelSet(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to create new label set',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateLabelSet({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelSetsService.updateLabelSet(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update label set info',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async deleteLabelSet({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$labelSetsService.deleteLabelSet(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to delete label set',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  }
}
