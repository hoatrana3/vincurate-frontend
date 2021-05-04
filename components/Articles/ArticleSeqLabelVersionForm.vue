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
    <div
      class="card stack stack--2 article-content-card"
      @mouseup.prevent="openPopover">
      <article-content-renderer
        id="article-content"
        ref="articleContent"
        :article="article"
        :overlay-article="suggestArticle"
        editable
        force-active
        class="card-body">
        <template #content-footer>
          <div class="d-flex w-100 justify-content-end mt-3">
            <b-btn size="sm" variant="outline-dark" class="mr-2">
              Apply all suggestions
            </b-btn>
            <b-form-checkbox
              v-model="useSuggestion"
              name="check-button"
              button
              size="sm"
              :button-variant="useSuggestion ? 'outline-info' : ''">
              Suggestion on select
            </b-form-checkbox>
          </div>
        </template>
      </article-content-renderer>
    </div>
    <div id="popover-marker"></div>
    <b-popover
      placement="auto"
      ref="suggestPopover"
      target="#popover-marker"
      custom-class="suggestion-popover"
      title="Suggestion?"
      @shown="setPopoverPosition">
      <div v-if="suggestArticle">
        <span
          v-for="{ id, offsetStart, offsetEnd, label: {value} } in suggestArticle.annotations"
          :key="id"
          :class="`d-block text-center mb-2 has-concept concept-${value} is-active`">
          {{ suggestArticle.content.substring(offsetStart, offsetEnd) }}
        </span>
      </div>
    </b-popover>
  </fragment>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArticleContentRenderer from '@/components/Articles/ArticleContentRenderer'

export default {
  components: { ArticleContentRenderer },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      useSuggestion: false,
      isOpenSuggestion: false,
      suggestArticle: null,
      cursorPos: { x: 0, y: 0 }
    }
  },
  computed: {
    ...mapGetters({
      allLabels: 'labels/getAllLabels',
      currentUser: 'users/getCurrentUser'
    }),
    labels() {
      return this.allLabels.filter(l => this.article.project.labels.includes(l.id))
    },
    suggestionPos() {
      return `top: ${this.cursorPos.x}px; left: ${this.cursorPos.y}px`
    }

  },
  watch: {
    cursorPos: {
      deep: true,
      handler(val) {
        console.log(val)
        console.log(this.suggestionPos)
      }
    }
  },
  created() {
    this.fetchArticleLabelingSuggesting()
  },
  methods: {
    ...mapActions({
      getArticleLabelingSuggesting: 'articles/fetchArticleLabelingSuggesting'
    }),
    async fetchArticleLabelingSuggesting() {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [this.article.id] })
        .addOnResponse((response) => {
          this.suggestArticle = response.getData()
        })
      await this.getArticleLabelingSuggesting(handler)
    },
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
    },
    openPopover(e) {
      console.log(e)
      this.$refs.suggestPopover.$emit('open')
      this.cursorPos = {
        x: e.clientX,
        y: e.clientY
      }
    },
    setPopoverPosition() {
      const popover = document.querySelector('.suggestion-popover')
      popover.style.transform = `translate3d(${this.cursorPos.x}px, ${this.cursorPos.y}px, 0)`
    }
  }
}
</script>
