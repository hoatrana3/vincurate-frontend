class ResponseWrapper {
  constructor(response) {
    this.data = response.data
    this.status = response.status
    this.success = !this.data.code
    this.message = this.data.message
  }

  isSuccess() {
    return this.status < 400 && this.success
  }

  isError() {
    return !this.isSuccess()
  }

  getStatus() {
    return this.status
  }

  getSuccess() {
    return this.success
  }

  getData() {
    return this.data
  }

  getMessage() {
    return this.message
  }
}

export default ResponseWrapper
