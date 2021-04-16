import jwtDecode from 'jwt-decode'
import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  allUsers: [],
  currentUser: null,
  currentToken: '',
  currentDecodedToken: null,
  userLabels: [],
  userCategories: [],
  userLabelSets: [],
})

export const getters = {
  getAllUsers(state) {
    return state.allUsers
  },
  getCurrentUser(state) {
    return state.currentUser
  },
  getToken(state) {
    return state.currentToken
  },
  getDecodedToken(state) {
    return state.currentDecodedToken
  },
  getCurrentUserId(state) {
    if (state.currentDecodedToken == null) return null
    return state.currentDecodedToken.sub
  },
  getUserLabels(state) {
    return state.userLabels
  },
  getUserCategories(state) {
    return state.userCategories
  },
  getUserLabelSets(state) {
    return state.userLabelSets
  },
  isLoggedIn(state) {
    return (
      state.currentUser != null &&
      state.currentToken.length > 0 &&
      state.currentDecodedToken != null
    )
  }
}

export const mutations = {
  setAllUsers(state, val) {
    state.allUsers = val
  },
  setCurrentUser(state, val) {
    state.currentUser = val
  },
  setCurrentToken(state, val) {
    state.currentToken = val
    this.$storage.saveToken(val)

    try {
      if (val.length > 0) state.currentDecodedToken = jwtDecode(val)
      else state.currentDecodedToken = null
    } catch (e) {
      state.currentDecodedToken = null
    }
  },
  setUserLabels(state, val) {
    state.userLabels = val
  },
  setUserCategories(state, val) {
    state.userCategories = val
  },
  setUserLabelSets(state, val) {
    state.userLabelSets = val
  },
}

export const actions = {
  async getAllUsers({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.getAllUsers()
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError('Failed to get all users', response.getMessage())
      } else {
        commit('setAllUsers', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async registerUser({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.registerUser(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to register new account',
          response.getMessage()
        )
      } else {
        dispatch('login', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async authenticateUser({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.authenticateUser(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to authenticate user',
          response.getMessage()
        )
      } else {
        dispatch('login', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async getUser({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.getUser(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError('Failed to get user', response.getMessage())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateUser({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.updateUser(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update user info',
          response.getMessage()
        )
      } else {
        commit('setCurrentUser', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async toggleActiveUser({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.updateUser(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to toggle active user',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async getUserArticles({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.getUserArticles(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError("Failed to get user's articles", response.getMessage())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async getUserProjects({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.getUserProjects(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError("Failed to get user's projects", response.getMessage())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async getUserLabels({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.getUserLabels(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError("Failed to get user's labels", response.getMessage())
      } else {
        commit('setUserLabels', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async getUserLabelSets({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.getUserLabelSets(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError("Failed to get user's label sets", response.getMessage())
      } else {
        commit('setUserLabelSets', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async getUserCategories({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$usersService.getUserCategories(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError("Failed to get user's categories", response.getMessage())
      } else {
        commit('setUserCategories', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  login({ commit }, { user, tokens: { access: { token } } }) {
    commit('setCurrentUser', user)
    commit('setCurrentToken', token)
    this.$router.push('/')
  },
  logout({ commit }) {
    commit('setCurrentToken', '')
    commit('setCurrentUser', null)
    this.$storage.forgetToken()
    this.$router.push('/')
  }
}
