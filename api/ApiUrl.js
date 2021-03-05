export default class ApiUrl {
  constructor(url) {
    this.url = url
  }

  get(params, query) {
    let res = this.url
    if (params && params.length)
      params.forEach((param) => {
        res = res.replace(/(\/)(:\w+)(\/*)/, `$1${param}$3`)
      })
    if (query && query.length) res = `${res}?${query}`

    return res
  }

  static build(url) {
    return new ApiUrl(url)
  }
}
