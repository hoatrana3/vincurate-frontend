export default ($context) => ({
  getCombinedUnits(article) {
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
  }
})
