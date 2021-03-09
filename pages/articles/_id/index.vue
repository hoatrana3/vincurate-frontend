<template>
  <div>
    <div class="page-section border-bottom-2">
      <div class="container-fluid row">
        <div class="col-md-6 offset-md-3">
          <article-details-header
            :article="currentArticle"
            class="d-flex flex-column flex-md-row align-items-center align-items-md-start flex mb-16pt text-center text-md-left" />
        </div>
      </div>
    </div>
    <div class="page-section border-bottom-2">
      <div class="container-fluid row">
        <div class="col-md-2 offset-md-1">
          <article-details-unit-filter-nav />
        </div>
        <div class="col-md-6">
          <article-details-content :article="currentArticle" />
        </div>
        <div class="col-md-2">
          <div class="d-flex align-items-center mb-3">
            <b-btn
              variant="light"
              class="flex mr-3"
              @click.prevent="$router.back">
              <md-icon
                class="mr-1"
                v-text="'arrow_back_ios'" />
              Back
            </b-btn>
            <b-btn
              variant="light"
              :disabled="!nextOlderArticle"
              class="flex"
              @click="goToNextArticle">
              Next
              <md-icon
                class="ml-1"
                v-text="'arrow_forward_ios'" />
            </b-btn>
          </div>
          <concepts-picker />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Page from '@/components/Page'
import ArticleDetailsHeader from '@/components/Articles/ArticleDetailsHeader'
import ArticleDetailsContent from '@/components/Articles/ArticleDetailsContent'
import ConceptsPicker from '@/components/Articles/ConceptsPicker'
import ArticleDetailsUnitFilterNav from '@/components/Articles/ArticleDetailsUnitFilterNav'

export default {
  components: { ConceptsPicker, ArticleDetailsContent, ArticleDetailsHeader, ArticleDetailsUnitFilterNav },
  extends: Page,
  layout: 'fixed',
  async asyncData({ store, params, $apiHandler, $notify, redirect }) {
    const handler = $apiHandler
      .build()
      .setData({ params: [params.id] })
      .addOnError((e) => {
        $notify.error(
          'Article not found',
          'We can not find the article you want'
        )
        redirect('/articles')
      })
    await store.dispatch('articles/fetchArticle', handler)

    let nextOlderArticle = null
    const _handler = $apiHandler
      .build()
      .setData({ params: [params.id] })
      .addOnResponse((response) => {
        nextOlderArticle = response.getData()
      })
    await store.dispatch('articles/fetchNextOlderArticle', _handler)

    return {
      nextOlderArticle
    }
  },
  data() {
    return {
      title: 'Read Article'
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
    goToNextArticle() {
      this.$router.push(this.nextOlderArticle.id)
    }
  }
}
</script>
