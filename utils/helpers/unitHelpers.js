import cloneDeep from 'lodash/cloneDeep'

export default () => ({
  UNIT_CONCEPTS: {
    DIS: {
      name: 'Disease',
      color: '233, 112, 1',
      hex: '#e97001',
      icon: 'mdi mdi-virus'
    },
    CHE: {
      name: 'Chemical',
      color: '45, 186, 76',
      hex: '#2dba4c',
      icon: 'mdi mdi-flask'
    },
    TRM: {
      name: 'Treatment',
      color: '33, 172, 203',
      hex: '#21accb',
      icon: 'mdi mdi-pill'
    },
    MISC: {
      name: 'Miscellaneous',
      color: '221, 9, 100',
      hex: '#dd0964',
      icon: 'mdi mdi-frequently-asked-questions'
    },
    ORG: {
      name: 'Organization',
      color: '18, 6, 122',
      hex: '#120670',
      icon: 'mdi mdi-city-variant'
    },
    PER: {
      name: 'Person',
      color: '159, 90, 177',
      hex: '#9f5ab1',
      icon: 'mdi mdi-account'
    },
    LOC: {
      name: 'Location',
      color: '224, 169, 4',
      hex: '#e0a904',
      icon: 'mdi mdi-map-marker'
    },
    O: {
      name: 'Others',
      color: '62, 62, 62',
      hex: '#3e3e3e',
      icon: 'mdi mdi-dots-horizontal-circle'
    }
  },
  WORDS_NO_SPACE_BEFORE: ['.', ',', ':', ')', '}', ']', '"', '\'', ';'],
  WORDS_NO_SPACE_AFTER: ['(', '[', '{', '"', '\''],
  setConceptsCssVarialbes() {
    for (const [key, value] of Object.entries(this.UNIT_CONCEPTS)) {
      document.documentElement.style.setProperty(
        `--concept-${key}-color`,
        value.color
      )
    }
  },
  getMainConcepts() {
    const temp = cloneDeep(this.UNIT_CONCEPTS)
    delete temp.O

    return temp
  },
  getUnitConceptType(unit) {
    let { label } = unit
    const splitIndex = label.indexOf('-')
    if (splitIndex >= 0) label = label.substring(splitIndex + 1)

    if (!label || !label.length) {
      console.log(label)
      label = 'O'
    }

    return label
  },
  getFormattedWordSpaces(
    target,
    before,
    after,
    isFirst = false,
    isLast = false
  ) {
    let afterStr = ''
    if (
      isLast ||
      (after.length && this.WORDS_NO_SPACE_BEFORE.includes(after[0])) ||
      (target.length &&
        this.WORDS_NO_SPACE_AFTER.includes(target[target.length - 1]))
    )
      afterStr = ''
    else afterStr = ' '

    let beforeStr = ''
    if (
      isFirst ||
      (before.length &&
        this.WORDS_NO_SPACE_AFTER.includes(before[before.length - 1])) ||
      (target.length && this.WORDS_NO_SPACE_BEFORE.includes(target[0]))
    )
      beforeStr = ''
    else beforeStr = ' '

    return `${beforeStr}${target}${afterStr}`
  }
})
