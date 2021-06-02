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
  addPickedFilter(state, val) {
    val.active = true
    state.pickedFilters.push(val)
  },
  removePickedFilter(state, val) {
    val.active = false
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
        this.$notify.warning(
          'There is nothing',
          'No articles found, please try again later!'
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
        commit('setCurrentArticle', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async fetchArticleLabelingSuggesting({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.fetchArticleLabelingSuggestion(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch article labeling suggestions',
          response.getMessage()
        )
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
  async createArticle({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.createArticle(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to create new article',
          response.getMessage()
        )
      } else {
        commit('setCurrentArticle', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
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
  async deleteArticle({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.deleteArticle(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to delete article',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateArticleAnnotations({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.updateArticleAnnotations(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update article annotations',
          response.getMessage()
        )
      } else {
        commit('setCurrentArticle', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateArticleCategories({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.updateArticleCategories(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update article categories',
          response.getMessage()
        )
      } else {
        commit('setCurrentArticle', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateArticleTranslation({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.updateArticleTranslation(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update article translation',
          response.getMessage()
        )
      } else {
        commit('setCurrentArticle', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async createArticleSeqLabelVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.createArticleSeqLabelVersion(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to create article labeling version',
          response.getMessage()
        )
      } else {
        commit('setCurrentArticle', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async createArticleCategoryVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.createArticleCategoryVersion(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to create article category version',
          response.getMessage()
        )
      } else {
        commit('setCurrentArticle', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async createArticleTranslationVersion({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$articlesService.createArticleTranslationVersion(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to create article translation version',
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
    this.$articlesService.exportArticle(handler.data)
  }
}
