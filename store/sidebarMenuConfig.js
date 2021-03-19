export const generalRoutes = ({ routes }) => [{
  label: 'Home',
  route: routes.home,
  icon: {
    type: 'md-icon',
    id: 'home'
  }
}, {
  label: 'Explore Articles',
  route: routes.articlesExplore,
  icon: {
    type: 'md-icon',
    id: 'local_library'
  }
}]

export const articleRoutes = ({ routes }) => [{
  label: 'My Articles',
  route: routes.myArticles,
  icon: {
    type: 'md-icon',
    id: 'featured_play_list'
  }
}]

export const labelingRoutes = ({ routes }) => [{
  label: 'Labeling Articles',
  route: routes.labelingArticles,
  icon: {
    type: 'md-icon',
    id: 'label'
  }
}]

export const projectRoutes = ({ routes }) => [{
  label: 'My Projects',
  route: routes.myProjects,
  icon: {
    type: 'md-icon',
    id: 'apps'
  }
}, {
  label: 'Add Project',
  route: routes.addProject,
  icon: {
    type: 'md-icon',
    id: 'add_box'
  }
}]

export const getters = {
  layoutMenu: (state, getters, rootState, rootGetters) => {
    const routes = rootGetters['settings/routes']

    return {
      general: generalRoutes({ routes }),
      articles: articleRoutes({ routes }),
      labeling: labelingRoutes({ routes }),
      projects: projectRoutes({ routes })
    }
  }
}

export const state = () => ({})
