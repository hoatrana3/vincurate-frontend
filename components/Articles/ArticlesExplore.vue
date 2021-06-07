<template>
  <div>
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
      </b-dropdown>
    </div>

    <div class="row card-group-row">
      <div
        class="col-md-9 row static-concepts-container"
        :data-concepts="selectedConcepts.join(', ')">
        <div class="col-12">
          <div ref="articleExploreScroll" />
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
      <div
        v-if="totalCount > 0"
        class="col-md-3">
        <concepts-picker :concept-labels="shownConceptLabels" />
      </div>
    </div>

    <custom-pager
      v-if="totalCount > perPage"
      v-model="currentPage"
      :rows="totalCount"
      :per-page="perPage" />
  </div>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import CustomPager from '@/components/General/CustomPager'
import ConceptsPicker from '@/components/Articles/ConceptsPicker'
import MiniArticleCard from '@/components/Articles/MiniArticleCard'
import { MdIcon } from 'vue-luma'
import Page from '@/components/Page'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    CustomPager,
    ConceptsPicker,
    MiniArticleCard,
    MdIcon
  },
  extends: Page,
  layout: 'fixed',
  props: {
    project: {
      type: Object,
      default: null
    },
    fields: {
      type: String,
      default: '*'
    },
    additionalQuery: {
      type: String,
      default: ''
    },
    additionalRequired: {
      type: Boolean,
      default: true
    },
    defaultPerPage: {
      type: Number,
      default: 10,
    },
    autoScroll: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      title: 'Explore Articles',
      articles: [],
      totalCount: null,
      currentPage: 1,
      perPage: this.defaultPerPage,
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters({
      searchResults: 'articles/getSearchResults',
      selectedConcepts: 'articles/getSelectedConcepts',
      allConceptLabels: 'labels/getAllLabels'
    }),
    searchQuery() {
      return this.$route.query.q || ''
    },
    pageQuery() {
      const page = this.$route.query.page
      return page ? parseInt(page) : this.currentPage
    },
    perPageQuery() {
      const per = this.$route.query.per
      return per ? parseInt(per) : this.perPage
    },
    shownConceptLabels() {
      if (!this.project) return this.allConceptLabels.filter(l => l.isSystem)
      return this.project.labels
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
    }
  },
  methods: {
    ...mapActions({
      searchArticles: 'articles/searchArticles'
    }),
    async getSearchData(query) {
      let q = query || this.searchQuery || '*'
      if (this.additionalQuery)
        q = `${this.additionalQuery} ${this.additionalRequired ? 'AND' : 'OR'} ${q}`

      const page = this.pageQuery
      const per = this.perPageQuery

      if (page && this.currentPage !== page) this.currentPage = page
      if (per && this.perPage !== per) this.perPage = per

      const handler = this.$apiHandler
        .build()
        .setData({
          query: `q=${q}&fields=${this.fields}&page=${page}&per=${per}`
        })

      await this.searchArticles(handler)

      if (this.searchResults) {
        this.articles = this.searchResults.articles
        this.totalCount = this.searchResults.total

        if (this.autoScroll && !isEmpty(this.$route.query)) {
          this.$nextTick(() => {
            this.$refs.articleExploreScroll.scrollIntoView(true)
          })
        }
      }
    },
    handlePageChange() {
      this.$router.push(
        `${this.$route.path}?q=${this.searchQuery}&page=${this.currentPage}&per=${this.perPage}`
      )
    },
    searchByInput() {
      this.$router.push(`${this.$route.path}?q=${this.searchInput}`)
    }
  }
}
</script>
