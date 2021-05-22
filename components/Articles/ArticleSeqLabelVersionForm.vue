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
      v-click-outside="showAllSuggestions"
      class="card stack stack--2 article-content-card">
      <article-content-renderer
        id="article-content"
        ref="articleContent"
        :article="article"
        editable
        force-active
        class="card-body"
        @contentSelected="onSelectEnd">
      </article-content-renderer>
      <div class="d-flex justify-content-end mb-3 mx-3">
        <b-form-checkbox
          v-if="hasSuggestions"
          v-model="suggestOnSelect"
          button-variant="outline-info"
          button
          size="sm">
          Show on select
        </b-form-checkbox>
        <b-btn
          id="suggestionToggler"
          pill
          size="sm"
          variant="warning"
          class="ml-2 position-relative">
          <md-icon v-text="'lightbulb_outline'" />
          <b-badge variant="danger" class="position-absolute top-0 right-0">
            <span>{{ currentSuggestions.length }}</span>
          </b-badge>
        </b-btn>
      </div>
    </div>
    <b-popover
      target="suggestionToggler"
      triggers="click"
      :show.sync="showSuggestionPopover"
      placement="top">
      <template #title>
        <div class="d-flex align-items-center justify-content-between">
          <span class="font-weight-bold text-uppercase">All Suggestions</span>
          <b-button
            pill
            variant="light"
            size="sm"
            class="ml-3"
            @click="closeSuggestionPopover">
            <md-icon v-text="'close'" />
          </b-button>
        </div>
      </template>
      <div>
        <template v-if="hasSuggestions">
          <div
            v-if="currentSuggestions.length"
            class="flex suggestion-list">
            <b-button
              v-for="sg in currentSuggestions"
              :key="sg.id"
              v-b-tooltip.hover
              size="sm"
              :title="`${sg.label.value}: (${sg.offsetStart}-${sg.offsetEnd})`"
              class="suggestion-item"
              :class="`has-${sg.label.value}-border-color has-${sg.label.value}-text-color bg-transparent`"
              @click="() => applySuggestions([sg])">
              <small>{{ article.content.substring(sg.offsetStart, sg.offsetEnd) }}</small>
            </b-button>
          </div>
          <small
            v-else
            class="text-center text-black-70">
            No suggestion for the selecting sequence
          </small>
        </template>
        <small
          v-else
          class="text-center text-black-70">
          Sorry, we don't have any suggestions for this article
        </small>
        <div class="mt-3">
          <b-btn
            v-if="hasSuggestions && currentSuggestions.length"
            block
            variant="primary"
            @click="() => applySuggestions(currentSuggestions)">
            Apply on selection
            <b-badge
              pill
              variant="light"
              class="ml-2 mb-0">
              {{ currentSuggestions.length }}
            </b-badge>
          </b-btn>
          <b-btn
            v-if="hasSuggestions"
            block
            variant="dark"
            @click="() => applySuggestions(suggestArticle.annotations)">
            Apply all
            <b-badge
              pill
              variant="light"
              class="ml-2 mb-0">
              {{ suggestArticle.annotations.length }}
            </b-badge>
          </b-btn>
        </div>
      </div>
    </b-popover>
  </fragment>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArticleContentRenderer from '@/components/Articles/ArticleContentRenderer'
import vClickOutside from 'v-click-outside'

export default {
  components: { ArticleContentRenderer },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showSuggestionPopover: false,
      suggestOnSelect: false,
      suggestArticle: null,
      currentSuggestions: []
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
    hasSuggestions() {
      return this.suggestArticle && this.suggestArticle.annotations.length > 0
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
          this.showAllSuggestions()
        })
      await this.getArticleLabelingSuggesting(handler)
    },
    doLabel(label) {
      const selectionInfo = this.getSelectionInfo()

      if (selectionInfo) {
        const newAnnotation = {
          article: this.article.id,
          label,
          offsetStart: selectionInfo.offsetStart,
          offsetEnd: selectionInfo.offsetEnd,
          user: this.currentUser.id
        }

        this.$refs.articleContent.addTextAnnotation(newAnnotation)
      }
    },
    getEditedAnnotations() {
      return this.$refs.articleContent.getAnnotations()
    },
    onSelectEnd() {
      const selectionInfo = this.getSelectionInfo(true)

      if (this.hasSuggestions && selectionInfo) {
        this.currentSuggestions =
          this.suggestArticle.annotations
            .filter(anno => this.hasIntersection(
              [anno.offsetStart, anno.offsetEnd],
              [selectionInfo.offsetStart, selectionInfo.offsetEnd]
            ))
        if (this.suggestOnSelect && this.currentSuggestions.length)
          this.showSuggestionPopover = true
      } else {
        this.showAllSuggestions()
      }
    },
    showAllSuggestions() {
      if (this.hasSuggestions) this.currentSuggestions = this.suggestArticle.annotations
    },
    getSelectionInfo(ignoreCheck) {
      const isContentEl = (el) => el.classList.contains('is-editable')
      const selection = window.getSelection()
      if (!selection.anchorNode || !selection.focusNode) return null

      const startAnchor = selection.anchorOffset
      const endAnchor = selection.focusOffset
      const startEl = selection.anchorNode.parentElement
      const endEl = selection.focusNode.parentElement

      if (
        ignoreCheck ||
        (startEl === endEl && startAnchor !== endAnchor && isContentEl(startEl) && isContentEl(endEl))
      ) {
        const offsetStartEl = startEl.getAttribute('offset-start')
        const offsetEndEl = endEl.getAttribute('offset-start')
        const offsetStartContent = parseInt(offsetStartEl) + startAnchor
        const offsetEndContent = parseInt(offsetEndEl) + endAnchor
        return {
          offsetStart: Math.min(offsetStartContent, offsetEndContent),
          offsetEnd: Math.max(offsetStartContent, offsetEndContent)
        }
      }

      return null
    },
    hasIntersection([start1, end1], [start2, end2]) {
      const leftLimit = Math.max(start1, start2)
      const rightLimit = Math.min(end1, end2)
      return leftLimit <= rightLimit
    },
    closeSuggestionPopover() {
      this.showSuggestionPopover = false
    },
    applySuggestions(suggestions) {
      const currentAnnos = this.$refs.articleContent.getAnnotations()
      suggestions.forEach(suggestion => {
        const index = currentAnnos.findIndex((anno) =>
          this.hasIntersection([suggestion.offsetStart, suggestion.offsetEnd], [anno.offsetStart, anno.offsetEnd])
        )

        if (index >= 0) this.$refs.articleContent.removeTextAnnotationByIndex(index)

        this.$refs.articleContent.addTextAnnotation(suggestion)
      })

      this.showSuggestionPopover = false
    }
  }

  // TODO: Apply suggestions
}
</script>
