import ResponseWrapper from '@/api/ResponseWrapper'
import CustomError from '@/api/CustomError'

export const state = () => ({
  currentProject: null,
  openAddProjectRoleModal: false,
  openAddProjectLabelModal: false,
  openAddProjectCategoryModal: false
})

export const getters = {
  getCurrentProject(state) {
    return state.currentProject
  },
  isOpenProjectRoleModal(state) {
    return state.openAddProjectRoleModal
  },
  isOpenProjectLabelModal(state) {
    return state.openAddProjectLabelModal
  },
  isOpenProjectCategoryModal(state) {
    return state.openAddProjectCategoryModal
  }
}

export const mutations = {
  setCurrentProject(state, val) {
    state.currentProject = val
  },
  setOpenAddProjectRoleModal(state, val) {
    state.openAddProjectRoleModal = val
  },
  setOpenAddProjectLabelModal(state, val) {
    state.openAddProjectLabelModal = val
  },
  setOpenAddProjectCategoryModal(state, val) {
    state.openAddProjectCategoryModal = val
  }
}

export const actions = {
  async createProject({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$projectsService.createProject(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to create new project',
          response.getMessage()
        )
      } else {
        commit('setCurrentProject', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async fetchProject({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$projectsService.fetchProject(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to fetch project details',
          response.getMessage()
        )
      } else {
        commit('setCurrentProject', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async updateProject({ commit }, handler) {
    const onRequest = async () => {
      const rawData = await this.$projectsService.updateProject(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to update project info',
          response.getMessage()
        )
      } else {
        commit('setCurrentProject', response.getData())
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
  async deleteProject({ commit, dispatch }, handler) {
    const onRequest = async () => {
      const rawData = await this.$projectsService.deleteProject(handler.data)
      const response = new ResponseWrapper(rawData)

      if (response.isError()) {
        throw new CustomError(
          'Failed to delete project',
          response.getMessage()
        )
      }

      return response
    }

    return await handler.setOnRequest(onRequest).execute()
  },
}
