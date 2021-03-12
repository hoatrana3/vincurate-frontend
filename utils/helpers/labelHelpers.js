export default ({ $apiHandler, store }) => ({
  async initLabelCofigs() {
    const handler = $apiHandler
      .build()
      .addOnResponse((response) => {
        this.setGlobalStyleVars(response.getData())
      })
    await store.dispatch('label/getAllLabels', handler)
  },
  setGlobalStyleVars(labels) {
    labels.forEach(({ value, color }) => {
      document.documentElement.style.setProperty(
        `--concept-${value}-color`,
        color
      )
    })
  }
})
