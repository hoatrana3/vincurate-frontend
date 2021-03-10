<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="System BioConcepts" />
    <page-separator title="Article Details" />
    <article-details-content
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
      console.log(this.article)
    }
  }
}
</script>
