<template>
  <fragment>
    <div class="d-flex flex-wrap align-items-center mb-3">
      <b-btn
        v-for="label in labels"
        :key="label.id"
        pill
        size="sm"
        class="btn-label mr-2 mb-2"
        :class="`has-${label.value}-background-color has-${label.value}-border-color`"
        @click="() => doLabel(label)">
        <small>{{ label.name }}</small>
        <b-badge
          pill
          variant="light"
          class="ml-2 mb-0">
          {{ label.value }}
        </b-badge>
      </b-btn>
    </div>
    <div class="card stack stack--2">
      <article-content-renderer
        ref="articleContent"
        id="article-content"
        :article="article"
        editable
        force-active
        class="card-body" />
    </div>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleContentRenderer from '@/components/Articles/ArticleContentRenderer'

export default {
  name: 'ArticleEditVersionForm',
  components: { ArticleContentRenderer },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      allLabels: 'label/getAllLabels',
      currentUser: 'users/getCurrentUser'
    }),
    labels() {
      return this.allLabels.filter(l => this.article.project.labels.includes(l.id))
    }
  },
  methods: {
    doLabel(label) {
      const selection = window.getSelection()
      const startAnchor = selection.anchorOffset
      const endAnchor = selection.focusOffset
      const startEl = selection.anchorNode.parentElement
      const endEl = selection.focusNode.parentElement

      if (startAnchor && endAnchor && startEl === endEl && startAnchor !== endAnchor) {
        const offsetStartEl = startEl.getAttribute('offset-start')
        const offsetStartContent = parseInt(offsetStartEl) + startAnchor
        const offsetEndContent = parseInt(offsetStartEl) + endAnchor
        const newAnnotation = {
          article: this.article.id,
          label,
          offsetStart: offsetStartContent,
          offsetEnd: offsetEndContent,
          user: this.currentUser.id
        }

        this.$refs.articleContent.addTextAnnotation(newAnnotation)
      }
    },
    getEditedAnnotations() {
      return this.$refs.articleContent.getAnnotations()
    }
  }
}
</script>
