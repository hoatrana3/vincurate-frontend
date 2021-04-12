export default ($context) => ({
  PROJECT_TYPES: {
    SEQ_LABEL: 'Sequence Labeling',
    DOC_CLASS: 'Document Classification',
    SEQ_TRANS: 'Sequence Translation',
  },
  isSeqLabelProject(project) {
    return project.types.includes(this.PROJECT_TYPES.SEQ_LABEL)
  },
  isDocClassProject(project) {
    return project.types.includes(this.PROJECT_TYPES.DOC_CLASS)
  },
  isSeqTransProject(project) {
    return project.types.includes(this.PROJECT_TYPES.SEQ_TRANS)
  }
})
