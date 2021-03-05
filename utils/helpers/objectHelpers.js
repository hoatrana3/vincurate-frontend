export default () => ({
  isPresent(object) {
    if (object == null) return false
    if (typeof object !== 'number') return object.length !== 0

    return true
  },
})
