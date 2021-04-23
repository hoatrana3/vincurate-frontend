<template>
  <div
    :class="containerClass"
    class="project-annotate-articles">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="About Project" />
      <div class="row mb-32pt">
        <div class="col-md-4">
          <b-form-group
            label="Project Title"
            class="mr-5"
            label-class="form-label">
            <b-link :to="`/projects/${currentProject.id}`">{{ currentProject.title }}</b-link>
          </b-form-group>
        </div>
        <div class="col-md-8">
          <b-form-group
            label="Project types"
            label-class="form-label">
            <span class="text-black-70">
              {{ currentProject.types.join(', ') }}
            </span>
          </b-form-group>
        </div>
      </div>

      <page-separator title="Perform annotate" />
      <div class="d-flex align-items-center mb-3">
        <small
          class="flex text-black-70 text-headings mr-3 d-flex align-items-center">
          <span>Displaying article at index </span>
          <b-form-input
            v-model="currentNavigation"
            class="navigate-index-input"
            @blur="() => goNavigateIndex()" />
          <span>/{{ currentProject.articles.length }} of the project</span>
        </small>
        <b-btn
          variant="light"
          class="mr-3 ml-auto"
          :disabled="!navigateInfo.prevArticle"
          :to="getArticleAnnotateLink(navigateInfo.prevArticle)">
          <md-icon
            class="mr-1"
            v-text="'arrow_back_ios'" />
          Back
        </b-btn>
        <b-btn
          variant="light"
          :disabled="!navigateInfo.nextArticle"
          :to="getArticleAnnotateLink(navigateInfo.nextArticle)">
          Next
          <md-icon
            class="ml-1"
            v-text="'arrow_forward_ios'" />
        </b-btn>
      </div>
      <article-curate-tabs :article="currentArticle" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  PageHeader,
  PageSeparator
} from 'vue-luma'
import Page from '@/components/Page'
import ArticleCurateTabs from '@/components/Articles/ArticleCurateTabs'

export default {
  components: {
    ArticleCurateTabs,
    PageHeader,
    PageSeparator
  },
  extends: Page,
  layout: 'boxed',
  async asyncData({ store, params, $apiHandler, $notify, redirect }) {
    let project = null
    const handler = $apiHandler
      .build()
      .setData({ params: [params.id] })
      .addOnResponse(response => {
        project = response.getData()
      })
      .addOnError((e) => {
        $notify.error(
          'Project not found',
          'We can not find the project you want'
        )
        redirect('/projects')
      })
    await store.dispatch('projects/fetchProject', handler)

    console.log(project)
    const _handler = $apiHandler
      .build()
      .setData({ params: [params.articleId || project.articles[0].id] })
      .addOnError((e) => {
        $notify.error(
          'Article not found',
          'We can not find the article you want'
        )
        redirect('/projects')
      })
    await store.dispatch('articles/fetchArticle', _handler)
  },
  data() {
    return {
      title: 'Annotate Article',
      currentNavigation: 0
    }
  },
  computed: {
    ...mapGetters({
      currentProject: 'projects/getCurrentProject',
      currentArticle: 'articles/getCurrentArticle'
    }),
    currArticleIndex() {
      return this.currentProject.articles.findIndex(a => a.id === this.currentArticle.id) + 1
    },
    navigateInfo() {
      return {
        prevArticle: this.currentProject.articles[this.currArticleIndex - 2],
        nextArticle: this.currentProject.articles[this.currArticleIndex]
      }
    }
  },
  created() {
    this.currentNavigation = this.currArticleIndex
  },
  methods: {
    getArticleAnnotateLink(article) {
      return article ? `/projects/${this.currentProject.id}/annotate/${article.id}?tab=${this.$route.query.tab || 0}` : '#'
    },
    goNavigateIndex() {
      const navIdx = parseInt(this.currentNavigation)
      if (isNaN(navIdx)) return

      if (navIdx > this.currentProject.articles.length || navIdx <= 0) {
        this.currentNavigation = this.currArticleIndex
        return
      }

      const article = this.currentProject.articles[navIdx - 1]
      this.$router.push(this.getArticleAnnotateLink(article))
    }
  }
}
</script>
