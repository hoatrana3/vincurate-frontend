<template>
  <div class="articles_explore">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="containerClass" />
    <div class="page-section">
      <div :class="containerClass">

        <form
          class="flex search-form form-control-rounded search-form--light mb-16pt"
          style="min-width: 200px;"
          @submit.prevent="searchByInput">
          <b-form-input
            v-model="searchInput"
            placeholder="Search articles..." />
          <b-btn
            class="pr-3"
            type="submit"
            variant="flush">
            <md-icon v-text="'search'" />
          </b-btn>
        </form>
        <div class="mb-32pt d-flex align-items-center">
          <small
            class="text-black-70 text-headings text-uppercase mr-3"
            v-text="`Displaying ${Math.min(perPage, totalCount)} out of ${totalCount || 0} articles`" />
          <b-dropdown
            class="ml-auto"
            text="All Categories"
            variant="flush text-black-70"
            right>
            <b-dropdown-item active>All Categories</b-dropdown-item>
            <b-dropdown-item>News</b-dropdown-item>
            <b-dropdown-item>Researchs</b-dropdown-item>
            <b-dropdown-item>Others</b-dropdown-item>
          </b-dropdown>
        </div>

        <div class="row card-group-row">
          <div
            class="col-md-9 row article-cards-container"
            :class="{ 'show-concepts': selectedConcepts.length > 0 }"
            :data-concepts="selectedConcepts.join(', ')">
            <div class="col-12">
              <div
                v-for="article in articles"
                :key="article.id"
                class="card-group-row__col">
                <mini-article-card
                  :article="article"
                  class="card-group-row__card" />
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <concepts-picker />
          </div>
        </div>

        <custom-pager
          v-model="currentPage"
          :rows="totalCount"
          :per-page="perPage" />

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Page from '~/components/Page.vue'
import MiniArticleCard from '@/components/Articles/MiniArticleCard'
import { MdIcon, PageHeader } from 'vue-luma'
import ConceptsPicker from '@/components/Articles/ConceptsPicker'
import CustomPager from '@/components/General/CustomPager'

export default {
  components: {
    CustomPager,
    ConceptsPicker,
    MiniArticleCard,
    MdIcon,
    PageHeader
  },
  extends: Page,
  layout: 'fixed',
  data() {
    return {
      title: 'Explore Articles',
      articles: [],
      totalCount: null,
      currentPage: 1,
      perPage: 10,
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters({
      searchResults: 'articles/getSearchResults',
      selectedConcepts: 'articles/getSelectedConcepts'
    }),
    searchQuery() {
      return this.$route.query.q || ''
    }
  },
  watch: {
    searchQuery: {
      immediate: true,
      deep: true,
      handler() {
        this.searchInput = this.searchQuery
        this.getSearchData()
      }
    },
    currentPage() {
      this.handlePageChange()
    },
  },
  created() {
    this.setSelectedConcepts(Object.keys(this.$helpers.getMainConcepts()))
  },
  methods: {
    ...mapActions({
      searchArticles: 'articles/searchArticles'
    }),
    ...mapMutations({
      setSelectedConcepts: 'articles/setSelectedConcepts'
    }),
    async getSearchData(query) {
      const q = query || this.searchQuery || '*'
      const page = this.currentPage
      const per = this.perPage

      if (this.currentPage !== page) this.currentPage = page
      if (this.perPage !== per) this.perPage = per

      const handler = this.$apiHandler
        .build()
        .setData({
          query: `q=${q}&page=${page}&per=${per}`
        })

      await this.searchArticles(handler)

      this.articles = this.searchResults.articles
      this.totalCount = this.searchResults.total
    },
    handlePageChange() {
      this.$router.push(
        `/articles/explore?q=${this.searchQuery}&page=${this.currentPage}&per=${this.perPage}`
      )
    },
    searchByInput() {
      this.$router.push(`/articles/explore?q=${this.searchInput}`)
    }
  }
}
</script>
