<template>
  <div>
    <div
      class="font-size-16pt text-justify static-concepts-container"
      :data-concepts="selectedConcepts.join(', ')">
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
    </div>
    <span class="d-block text-right text-black-70 mt-2">
      by <b-link to="#">{{ article.lastCurator.name }}</b-link>
      <md-icon>remove</md-icon>
      {{ $helpers.formatTimeAgo(article.updatedAt) }}
      <md-icon>remove</md-icon>
      <b class="text-primary">{{ diffAnnotations.length }} different(s)</b>
    </span>
  </div>
</template>

<script>
import ArticleContentRenderer from './ArticleContentRenderer'
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters } from 'vuex'

export default {
  extends: ArticleContentRenderer,
  props: {
    compArticle: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      compContent: '',
      compAnnotations: []
    }
  },
  computed: {
    ...mapGetters({
      onlyShowDiff: 'seqLabelVersions/getOnlyShowDiff'
    }),
    diffAnnotations() {
      return this.annotations.filter(anno => {
        return this.compAnnotations.findIndex(_anno => _anno.offsetStart === anno.offsetStart && _anno.offsetEnd === anno.offsetEnd) < 0
      })
    }
  },
  created() {
    this.compContent = this.compArticle.content
    this.compAnnotations = cloneDeep(this.compArticle.annotations)
  },
  methods: {
    getTextCustomClass(text) {
      const isDiff = text.annotation && this.diffAnnotations.findIndex(anno => anno.id === text.annotation.id) >= 0
      const conceptClass = text.annotation ? `has-concept concept-${text.value}` : ''
      const editableClass = this.editable && isDiff ? 'is-editable' : (this.onlyShowDiff ? 'is-disabled' : '')
      const forceActiveClass = this.forceActive && (!this.onlyShowDiff || isDiff) ? 'is-active' : ''

      return [conceptClass, editableClass, forceActiveClass].filter(i => i.length).join(' ')
    },
    getDiffAnnos() {
      return this.diffAnnotations
    }
  }
}
</script>
