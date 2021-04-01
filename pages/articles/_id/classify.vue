<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="Select categories" />
      <article-category-version-form
        ref="articleCategoryVersionForm"
        :article="currentArticle" />
      <b-btn
        variant="primary"
        class="mr-2"
        @click="doSaveForReview">
        Save for reviewing
      </b-btn>
      <b-btn
        variant="accent"
        @click="doSaveDirectly">
        Save to origin data
      </b-btn>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {
  PageHeader,
  PageSeparator
} from 'vue-luma'
import Page from '@/components/Page'
import ArticleCategoryVersionForm from '@/components/Articles/ArticleCategoryVersionForm'

export default {
  components: {
    ArticleCategoryVersionForm,
    PageHeader,
    PageSeparator
  },
  extends: Page,
  layout: 'boxed',
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
  },
  data() {
    return {
      title: 'Classifying Article',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle',
      currentUser: 'users/getCurrentUser'
    }),
    saveHandler() {
      const data = {
        categories: this.$refs.articleCategoryVersionForm.getEditedCategories()
      }

      return this.$apiHandler
        .build()
        .setData({
          params: [this.info.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated article',
            'Your article categories is successfully updated'
          )
          this.$router.push(`/articles/${response.getData().id}/details`)
        })
    }
  },
  created() {
    this.info = cloneDeep(this.currentArticle)
  },
  methods: {
    ...mapActions({
      updateArticleCategories: 'articles/updateArticleCategories',
      createArticleCategoryVersion: 'articles/createArticleCategoryVersion'
    }),
    doSaveDirectly() {
      this.updateArticleCategories(this.saveHandler)
    },
    doSaveForReview() {
      this.createArticleCategoryVersion(this.saveHandler)
    }
  }
}
</script>
