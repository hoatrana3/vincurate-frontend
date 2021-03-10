import flattenDeep from 'lodash/flattenDeep'

export default ($context) => ({
  unitsToCombinedUnits(article) {
    const units = article.units
    const combinedUnits = []
    let currentCombiner = null

    units.forEach((unit, index) => {
      const unitType = $context.$helpers.getUnitConceptType(unit)

      if (
        !currentCombiner ||
        unit.label.startsWith('B') ||
        currentCombiner.type !== unitType
      ) {
        if (currentCombiner) {
          currentCombiner.message = currentCombiner.indexes
            .map((index) =>
              unescape(
                $context.$helpers.getFormattedWordSpaces(
                  units[index].word,
                  index > 0 ? units[index - 1].word : null,
                  index < units.length - 1 ? units[index + 1].word : null,
                  index === 0,
                  index === units.length - 1
                )
              )
            )
            .join('')
            .trim()

          combinedUnits.push(currentCombiner)
        }

        currentCombiner = {
          message: '',
          type: unitType,
          indexes: [index]
        }
      } else {
        currentCombiner.indexes.push(index)
      }
    })

    return combinedUnits
  },
  combinedUnitsToUnits(article) {
    const combinedUnits = article.combinedUnits
    const aUnits = article.units
    let units = []

    combinedUnits.forEach(({ type, indexes }) => {
      const cuUnits = []
      indexes.forEach(idx => cuUnits.push(aUnits[idx]))

      cuUnits.forEach((cuU, cuIdx) => {
        if (type !== 'O') {
          cuU.label = `${ cuIdx === 0 ? 'B' : 'I' }-${type}`
        } else {
          cuU.label = 'O'
        }
      })

      units.push(...cuUnits)
    })

    return units
  },
  groupCombinedUnits(cUnits) {
    const messages = cUnits.map(cU => cU.message)
    const indexes = cUnits.map(cU => cU.indexes)

    return {
      message: messages.join(' '),
      type: cUnits[0].type,
      indexes: flattenDeep(indexes)
    }
  },
  splitCombinedUnits(cUnit, start, end, type) {

  }
})
