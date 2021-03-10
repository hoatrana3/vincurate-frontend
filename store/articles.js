import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  searchResults: null,
  currentArticle: null,
  selectedConcepts: [],
  pickedFilters: []
})

export const getters = {
  getSearchResults(state) {
    return state.searchResults
  },
  getCurrentArticle(state) {
    return state.currentArticle
  },
  getSelectedConcepts(state) {
    return state.selectedConcepts
  },
  getPickedFilters(state) {
    return state.pickedFilters
  }
}

export const mutations = {
  setSearchResults(state, { hits }) {
    const articles = []
    hits.hits.forEach(hit => {
      articles.push({
        id: hit._id,
        ...hit._source
      })
    })

    state.searchResults = {
      articles,
      total: hits.total
    }
  },
  setCurrentArticle(state, val) {
    state.currentArticle = val
  },
  setSelectedConcepts(state, val) {
    state.selectedConcepts = val
  },
  setPickedFilters(state, val) {
    state.pickedFilters = val
  },
  changeActiveUnitInFilter(state, val) {
    val.active = false
  },
  addPickedFilter(state, val) {
    state.pickedFilters.push(val)
  },
  removePickedFilter(state, val) {
    state.pickedFilters = state.pickedFilters.filter((t) => t !== val)
  }
}

export const actions = {
  async uploadArticle({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.uploadArticle(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError('Failed upload article', response.getMessage())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async searchArticles({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.searchArticles(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to search articles',
          'Somethings went wrong wile fetching articles!'
        )
      } else {
        commit('setSearchResults', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async fetchArticle({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.fetchArticle(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch article details',
          response.getMessage()
        )
      } else {
        const article = response.getData()
        article.combinedUnits = this.$helpers.unitsToCombinedUnits(article)

        commit('setCurrentArticle', article)
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async fetchNextOlderArticle({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.fetchNextOlderArticle(
        handler.data
      )
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        response.data = null
      }

      return response
    }

    await handler.setOnRequest(onRequest).execute()
  },
  async updateArticle({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.updateArticle(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update article info',
          response.getMessage()
        )
      } else {
        commit('setCurrentArticle', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async exportArticle({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.exportArticle(handler.data)
      const response = new ResponseWrapper(rawData, true)

      if (response.isError()) {
        throw new CustomError('Failed to export article', response.getMessage())
      } else {
        window.open(rawData.config.url)
        // TODO: This way of handling will cause duplicate call API!
      }

      return response
    }

    await handler.setOnRequest(onRequest).execute()
  }
}
