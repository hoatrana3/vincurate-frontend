export default ({ $notify, $loader }) => {
  class ApiHandler {
    constructor() {
      this.data = null
      this.onStarts = []
      this.onRequest = () => {}
      this.onResponses = []
      this.onErrors = []
      this.onFinallies = []
    }

    setData(data) {
      this.data = data
      return this
    }

    addOnStarts(onStart) {
      this.onStarts.push(onStart)
      return this
    }

    setOnRequest(onRequest) {
      this.onRequest = onRequest
      return this
    }

    addOnResponse(onResponse) {
      this.onResponses.push(onResponse)
      return this
    }

    addOnError(onError) {
      this.onErrors.push(onError)
      return this
    }

    addOnFinally(onFinally) {
      this.onFinallies.push(onFinally)
      return this
    }

    notifyError({ title, text }) {
      $notify.error(title, text)
    }

    async execute() {
      try {
        $loader.startLoad()
        this.onStarts.forEach((onStart) => onStart())
        const response = await this.onRequest()
        this.onResponses.forEach((onResponse) => onResponse(response))
      } catch (err) {
        if (this.onErrors.length === 0)
          this.notifyError({
            title: err.title || 'Oops, somethings went wrong!',
            text: err.text || err,
          })
        else this.onErrors.forEach((onError) => onError(err))
      } finally {
        this.onFinallies.forEach((onFinally) => onFinally())
        $loader.stopLoad()
      }
    }
  }

  return {
    build() {
      return new ApiHandler()
    },
  }
}
