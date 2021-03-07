export const guestRoutes = ({ routes }) => [{
  label: 'Home',
  route: routes.home,
  icon: {
    type: 'md-icon',
    id: 'home'
  }
}, {
  label: 'Browse Articles',
  route: routes.guestSearchArticles,
  icon: {
    type: 'md-icon',
    id: 'local_library'
  }
}]

export const getters = {
  layoutMenu: (state, getters, rootState, rootGetters) => {
    const routes = rootGetters['settings/routes']

    return {
      guest: guestRoutes({ routes })
    }
  }
}

export const state = () => ({})
