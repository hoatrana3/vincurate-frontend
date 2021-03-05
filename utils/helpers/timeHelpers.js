import capitalize from 'lodash/capitalize'

export default ({ $moment }) => ({
  formatTimeAgo(time, format = '') {
    const currentMoment = $moment()
    const timeMoment = $moment(time, format)
    const diffDays = currentMoment.diff(timeMoment, 'days')

    if (diffDays > 1) return timeMoment.format('MMM DD YYYY')
    return capitalize(timeMoment.fromNow())
  }
})
