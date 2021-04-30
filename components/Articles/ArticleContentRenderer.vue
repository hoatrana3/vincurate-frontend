<template>
  <div
    class="font-size-16pt text-justify static-concepts-container"
    :data-concepts="selectedConcepts.join(', ')">
    <template
      v-if="$helpers.isSeqLabelProject(article.project)">
      <span
        v-for="(text, index) in preformatTexts"
        :key="`${text.text}-${$moment().unix()}-${index}`"
        :offset-start="text.offsetStart"
        :class="getTextCustomClass(text)"><!--
      -->{{ text.text }}<!--
      --><i
        v-if="editable && text.value.length"
        class="mdi mdi-close-circle concept-remove-btn"
        @click="removeTextAnnotation(text)" /><!--
    --></span>
    </template>
    <template v-else>
      {{content}}
    </template>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters } from 'vuex'

export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    forceActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: '',
      annotations: []
    }
  },
  computed: {
    ...mapGetters({
      selectedConcepts: 'articles/getSelectedConcepts',
      pickedFilters: 'articles/getPickedFilters'
    }),
    preformatTexts() {
      const results = []
      const annos = cloneDeep(this.annotations).sort((a1, a2) => a1.offsetEnd - a2.offsetEnd)
      const desc = this.content
      let contentIndex = 0
      let annoIndex = 0

      while (contentIndex < desc.length) {
        let text = ''
        let textAnno = null
        let value = ''
        const preContentIndex = contentIndex
        const anno = annos[annoIndex]

        if (anno) {
          if (contentIndex < anno.offsetStart) {
            text = desc.substring(contentIndex, anno.offsetStart)
            contentIndex = anno.offsetStart
          } else {
            text = desc.substring(contentIndex, anno.offsetEnd)
            textAnno = anno
            value = anno.label.value
            contentIndex = anno.offsetEnd
            annoIndex++
          }
        } else {
          text = desc.substring(contentIndex)
          contentIndex = desc.length
        }

        results.push({
          text,
          value,
          offsetStart: preContentIndex,
          annotation: textAnno
        })
      }

      return results
    }
  },
  watch: {
    article: {
      immediate: true,
      handler(val) {
        this.content = val.content
        this.annotations = cloneDeep(val.annotations)
      }
    }
  },
  methods: {
    getTextCustomClass(text) {
      const indexFilter = this.pickedFilters.findIndex(f => f.text.toLowerCase().trim() === text.text.toLowerCase().trim())
      const conceptClass = text.annotation ? `has-concept concept-${text.value}` : ''
      const filterClass = indexFilter >= 0 ? 'is-filter' : ''
      const editableClass = this.editable ? 'is-editable' : ''
      const forceActiveClass = this.forceActive ? 'is-active' : ''

      return [conceptClass, filterClass, editableClass, forceActiveClass].filter(i => i.length).join(' ')
    },
    removeTextAnnotation(text) {
      const index = this.annotations.findIndex(a => a.offsetStart === text.annotation.offsetStart && a.offsetEnd === text.annotation.offsetEnd)
      if (index >= 0) this.annotations.splice(index, 1)
    },
    addTextAnnotation(annotation) {
      this.annotations.push(annotation)
    },
    getAnnotations() {
      return this.annotations
    }
  }
}
</script>
