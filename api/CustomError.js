class CustomError extends Error {
  constructor(title, text) {
    super(text)
    this.title = title
    this.text = text
  }
}

export default CustomError
