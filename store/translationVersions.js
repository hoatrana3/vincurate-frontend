import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  currentTranslationVersion: null,
  onlyShowDiff: true,
})

export const getters = {
  getCurrentTranslationVersion(state) {
    return state.currentTranslationVersion
  },
  getOnlyShowDiff(state) {
    return state.onlyShowDiff
  },
}

export const mutations = {
  setCurrentTranslationVersion(state, val) {
    state.currentTranslationVersion = val
  },
  setOnlyShowDiff(state, val) {
    state.onlyShowDiff = val
  },
}

export const actions = {
  async fetchTranslationVersion({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$translationVersionsService.fetchTranslationVersion(
        handler.data
      )
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch article translation version details',
          response.getMessage()
        )
      } else {
        commit('setCurrentTranslationVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateTranslationVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$translationVersionsService.updateTranslationVersion(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update translation version info',
          response.getMessage()
        )
      } else {
        commit('setCurrentTranslationVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async applyTranslationVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$translationVersionsService.applyTranslationVersion(
        handler.data
      )
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to apply review translation version',
          response.getMessage()
        )
      } else {
        commit('setCurrentTranslationVersion', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
}
