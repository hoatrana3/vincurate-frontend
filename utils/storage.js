import { Session } from 'fm-app-settings'
const { name, version } = require('~/package.json')

export default () => ({
  SESSION: new Session(`${name}-${version}`),
  TOKEN_KEY: 'token',

  saveToken(token) {
    this.SESSION.save(this.TOKEN_KEY, token)
  },
  getToken() {
    return this.SESSION.memory(this.TOKEN_KEY)
  },
  forgetToken() {
    this.SESSION.forget(this.TOKEN_KEY)
  },
})
