export const state = () => ({
  brand: 'Vincurate',
  docsHostname: 'www.vincurate.com'
})

export const getters = {
  settings: state => state.settings.state
}
