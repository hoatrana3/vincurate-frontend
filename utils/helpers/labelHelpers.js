import insertCss from 'insert-css'
import hexRgb from 'hex-rgb'

export default ($context) => ({
  async initLabelCofigs() {
    console.log('asdsd')
    const handler = $context.$apiHandler
      .build()
      .addOnResponse((response) => {
        this.setGlobalStyleVars(response.getData())
        this.setGlobalCssClasses(response.getData())
      })
    await $context.store.dispatch('labels/getAllLabels', handler)
  },
  setGlobalStyleVars(labels) {
    labels.forEach(({ value, color }) => {
      document.documentElement.style.setProperty(
        `--concept-${value}-color`,
        color
      )
    })
  },
  getLabelPreviewClass(label) {
    switch (label.type) {
      case 'Concept':
        return `has-concept concept-${label.value} is-active`;
      default:
        return `has-category category-${label.value}`
    }
  },
  setGlobalCssClasses(labels) {
    labels.forEach(({ value, color }) => {
      const bgColor = hexRgb(color, { format: 'array' });
      bgColor[3] = 0.2;
      const bgColorStr = bgColor.join(',')

      insertCss(`
        .has-${value}-text-color {
          color: ${color} !important;
        }
        .has-${value}-background-color {
          background-color: ${color} !important;
        }
        .has-${value}-border-color {
          border-color: ${color} !important;
        }
        .static-concepts-container[data-concepts*='${value}'] .has-concept.concept-${value}:not(.is-disabled),
        .has-concept.concept-${value}.is-active {
          border-radius: 4px;
          color: ${color};
          background-color: rgba(${bgColorStr});
        }
        .has-concept.concept-${value}.is-filter {
          border: 2px solid ${color};
        }
        .has-concept-checkbox.concept-${value} .custom-control-input:checked ~ .custom-control-label::before {
          border-color: ${color};
          background-color: ${color};
        }
        .has-concept-checkbox.concept-${value} .checkbox-concept-text,
        .text-concept-${value} {
          color: ${color};
        }
        .has-category.category-${value} {
          border: 2px solid ${color};
          color: ${color};
          background-color: rgba(${bgColorStr});
          text-align: center;
        }
      `)
    })
  }
})
