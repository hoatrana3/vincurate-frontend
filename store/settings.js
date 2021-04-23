const _ = require('lodash')

export const state = () => ({
  ui: false,
  state: {
    layout: {
      layout: 'app',
      rtl: false
    },
    'app::mainDrawer': {
      align: 'start',
      sidebar: 'dark'
    },
    'fixed::mainDrawer': {
      align: 'start',
      sidebar: 'dark'
    },
    'sticky::mainDrawer': {
      align: 'start',
      sidebar: 'dark'
    },
    'boxed::mainDrawer': {
      align: 'start',
      sidebar: 'light'
    },
    'app::mainNavbar': {
      navbar: 'light'
    },
    'fixed::mainNavbar': {
      navbar: 'dark'
    },
    'sticky::mainNavbar': {
      navbar: 'light'
    },
    'boxed::mainNavbar': {
      navbar: 'dark'
    }
  }
})

export const mutations = {
  SET_SETTINGS(state, settings) {
    if (settings) {
      state.state = _.merge({}, state.state, settings)
    }
  }
}

export const actions = {
  setSettings({ commit }, settings) {
    commit('SET_SETTINGS', settings)
  }
}

export const getters = {
  layout: state => state.state.layout.layout,
  routes: (state, getters) => {
    const layout = getters.layout
    return {
      home: {
        name: 'home',
        params: { layout }
      },
      explore: {
        name: 'explore',
        params: { layout }
      },
      login: {
        name: 'auth-login',
        params: { layout }
      },
      signup: {
        name: 'auth-signup',
        params: { layout }
      },
      myArticles: {
        name: 'user-articles-my-articles',
        params: { layout }
      },
      editAccount: {
        name: 'user-edit-account',
        params: { layout }
      },
      myProjects: {
        name: 'user-projects-my-projects',
        params: { layout }
      },
      addProject: {
        name: 'user-projects-new',
        params: { layout }
      },
      manageMyLabels: {
        name: 'user-labels-manage',
        params: { layout }
      },
      myCategories: {
        name: 'user-categories-my-categories',
        params: { layout }
      },
      adminManageUsers: {
        name: 'admin-manage-users',
        params: { layout }
      }
    }
  }
}
