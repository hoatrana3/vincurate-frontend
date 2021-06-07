export default ($context) => ({
  PROJECT_TYPES: {
    SEQ_LABEL: 'Sequence Labeling',
    DOC_CLASS: 'Document Classification',
    SEQ_TRANS: 'Sequence Translation',
  },
  PROJECT_ROLES: {
    ANNOTATOR: 'Annotator',
    APPROVER: 'Approver',
    PROJECT_ADMIN: 'Project Admin',
  },
  isSeqLabelProject(project) {
    return project.types.includes(this.PROJECT_TYPES.SEQ_LABEL)
  },
  isDocClassProject(project) {
    return project.types.includes(this.PROJECT_TYPES.DOC_CLASS)
  },
  isSeqTransProject(project) {
    return project.types.includes(this.PROJECT_TYPES.SEQ_TRANS)
  },
  currentUserRoleInProject(project) {
    const {store} = $context
    const currentUser = store.getters['users/getCurrentUser']

    if (!currentUser) return false
    if (project.owner.id === currentUser.id) return this.PROJECT_ROLES.PROJECT_ADMIN

    const role = project.roles.find(r => r.user.id === currentUser.id || r.user === currentUser.id)
    return role ? role.role : null
  },
  isCurrentUserProjectAdmin(project) {
    return this.currentUserRoleInProject(project) === this.PROJECT_ROLES.PROJECT_ADMIN
  },
  isCurrentUserApprover(project) {
    return this.currentUserRoleInProject(project) === this.PROJECT_ROLES.APPROVER
  },
  isCurrentUserAnnotator(project) {
    return this.currentUserRoleInProject(project) === this.PROJECT_ROLES.ANNOTATOR
  }
})
