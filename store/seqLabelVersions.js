import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  currentSeqLabelVersion: null,
  onlyShowDiff: true,
})

export const getters = {
  getCurrentSeqLabelVersion(state) {
    return state.currentSeqLabelVersion
  },
  getOnlyShowDiff(state) {
    return state.onlyShowDiff
  },
}

export const mutations = {
  setCurrentSeqLabelVersion(state, val) {
    state.currentSeqLabelVersion = val
  },
  setOnlyShowDiff(state, val) {
    state.onlyShowDiff = val
  },
}

export const actions = {
  async fetchSeqLabelVersion({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$seqLabelVersionsService.fetchSeqLabelVersion(
        handler.data
      )
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch article labeling version details',
          response.getMessage()
        )
      } else {
        commit('setCurrentSeqLabelVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateSeqLabelVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$seqLabelVersionsService.updateSeqLabelVersion(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update labeling version info',
          response.getMessage()
        )
      } else {
        commit('setCurrentSeqLabelVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async applySeqLabelVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$seqLabelVersionsService.applySeqLabelVersion(
        handler.data
      )
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to apply review labeling version',
          response.getMessage()
        )
      } else {
        commit('setCurrentSeqLabelVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
}
