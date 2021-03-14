<template>
  <div
    class="font-size-16pt text-justify static-concepts-container"
    :data-concepts="selectedConcepts.join(', ')"
    v-html="styledContent">
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
    styledContent() {
      const annos = cloneDeep(this.annotations).sort((a1, a2) => a2.offsetEnd - a1.offsetEnd)
      let desc = this.content

      annos.forEach((anno) => {
        let annotatedStr = desc.substring(anno.offsetStart, anno.offsetEnd)
        const label = anno.label
        const indexFilter = this.pickedFilters.findIndex(f => f.text.toLowerCase() === annotatedStr.toLowerCase())

        annotatedStr = `<span class="has-concept concept-${label.value}${indexFilter >= 0 ? ' is-filter' : ''}">${annotatedStr}</span>`
        desc = [desc.slice(0, anno.offsetStart), annotatedStr, desc.slice(anno.offsetEnd)].join('')
      })

      return desc
    }
  },
  created() {
    this.content = this.article.content
    this.annotations = this.article.annotations
  }
}
</script>
