export const generalRoutes = ({ routes }) => [{
  label: 'Home',
  route: routes.home,
  icon: {
    type: 'md-icon',
    id: 'home'
  }
}]

export const articleRoutes = ({ routes }) => [{
  label: 'Explore Articles',
  route: routes.articlesExplore,
  icon: {
    type: 'md-icon',
    id: 'local_library'
  }
}, {
  label: 'Upload Articles',
  route: routes.articlesUpload,
  icon: {
    type: 'md-icon',
    id: 'cloud_upload'
  }
}]

export const getters = {
  layoutMenu: (state, getters, rootState, rootGetters) => {
    const routes = rootGetters['settings/routes']

    return {
      general: generalRoutes({ routes }),
      articles: articleRoutes({ routes })
    }
  }
}

export const state = () => ({})
