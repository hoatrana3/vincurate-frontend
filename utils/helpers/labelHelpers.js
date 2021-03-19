import insertCss from 'insert-css'
import hexRgb from 'hex-rgb'

export default ({ $apiHandler, store }) => ({
  async initLabelCofigs() {
    const handler = $apiHandler
      .build()
      .addOnResponse((response) => {
        this.setGlobalStyleVars(response.getData())
        this.setGlobalCssClasses(response.getData())
      })
    await store.dispatch('label/getAllLabels', handler)
  },
  setGlobalStyleVars(labels) {
    labels.forEach(({ value, color }) => {
      document.documentElement.style.setProperty(
        `--concept-${value}-color`,
        color
      )
    })
  },
  setGlobalCssClasses(labels) {
    labels.forEach(({ value, color }) => {
      const bgColor = hexRgb(color, { format: 'array' });
      bgColor[3] = 0.2;
      const bgColorStr = bgColor.join(',')

      insertCss(`
        .static-concepts-container[data-concepts*='${value}'] .has-concept.concept-${value},
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
      `)
    })
  }
})
