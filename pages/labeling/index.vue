<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="System BioConcepts" />
    <div class="btn-labels-container d-flex flex-wrap align-items-center mb-3">
      <div
        v-for="[type, concept] of Object.entries($helpers.UNIT_CONCEPTS)"
        :key="type"
        :style="`--concept-color: ${concept.color}`">
        <b-btn
          v-if="type !== 'O'"
          pill
          size="sm"
          class="btn-label mr-2 mb-2">
          <small>{{ concept.name }}</small>
          <b-badge
            pill
            variant="light"
            class="ml-2 mb-0">
            {{ type }}
          </b-badge>
        </b-btn>
      </div>
    </div>
    <article-details-content
      body-id="article-content"
      :article="article"
      :show-header="false"
      is-editable
      @onArticleContentEdited="onArticleEdited">
      <template v-slot:content-footer>
        <div class="card-footer d-flex align-items-center">
          <b-btn
            variant="primary"
            class="ml-auto"
            @click.prevent="doSaveLabeling">
            Save Changes
          </b-btn>
        </div>
      </template>
    </article-details-content>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import {
  PageHeader,
  PageSeparator
} from 'vue-luma'
import Page from '@/components/Page'
import ArticleDetailsContent from '@/components/Articles/ArticleDetailsContent'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    ArticleDetailsContent,
    PageHeader,
    PageSeparator
  },
  extends: Page,
  layout: 'boxed',
  async asyncData({ store, $apiHandler, $notify, redirect }) {
    let article
    const handler = $apiHandler
      .build()
      .setData({ params: ['60463ef15dfe800064939b80'] })
      .addOnResponse(response => {
        article = cloneDeep(response.getData())
      })
      .addOnError((e) => {
        $notify.error(
          'Article not found',
          'We can not find the article you want'
        )
        redirect('/articles')
      })
    await store.dispatch('articles/fetchArticle', handler)

    return { article }
  },
  data() {
    return {
      title: 'Labeling Article'
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle'
    })
  },
  created() {
    this.setSelectedConcepts(Object.keys(this.$helpers.getMainConcepts()))
    this.setPickedFilters([])
  },
  mounted() {
    this.setArticleContentSelectEvent()
  },
  methods: {
    ...mapMutations({
      setSelectedConcepts: 'articles/setSelectedConcepts',
      setPickedFilters: 'articles/setPickedFilters'
    }),
    onArticleEdited(article) {
      this.article = cloneDeep(article)
    },
    doSaveLabeling() {
      this.article.units = this.$helpers.combinedUnitsToUnits(this.article)
    },
    setArticleContentSelectEvent() {
      document.getElementById('article-content').addEventListener('mouseup', () => {
        const selection = window.getSelection()
        console.log(selection)
        const startAnchor = selection.anchorOffset
        const endAnchor = selection.focusOffset
        const startEl = selection.anchorNode.parentElement
        const endEl = selection.focusNode.parentElement
        const startUnitIndex = startEl.getAttribute('unit-index')
        const endUnitIndex = endEl.getAttribute('unit-index')
        const startUnitConcept = startEl.getAttribute('unit-concept')

        if (startUnitIndex === endUnitIndex && startUnitConcept === 'O') {
          // TODO: We need to split combined units into more combined units
          // But, to do that, we need to add to combined units indexes fileds the index of a origin unit start and end in all article
          // Then in side this, we will compare with startAnchor and endAnchor, and then we can find the nearest origin unit and select it!
        }
      })
    }
  }
}
</script>
