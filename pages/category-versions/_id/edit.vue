<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="Project categories" />
      <article-category-version-form
        ref="articleCategoryVersionForm"
        :article="editedArticle" />
      <b-btn
        variant="primary"
        class="mr-2"
        @click="doSave">
        Save category version
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
          'Article category version not found',
          'We can not find the article category version you want'
        )
        redirect('/articles')
      })
    await store.dispatch('categoryVersions/fetchCategoryVersion', handler)

    const currentCategoryVersion = store.getters['categoryVersions/getCurrentCategoryVersion']
    const handlerArticle = $apiHandler
      .build()
      .setData({ params: [currentCategoryVersion.article.id] })
      .addOnError((e) => {
        $notify.error(
          'Article not found',
          'We can not find the article you want'
        )
        redirect('/articles')
      })
    await store.dispatch('articles/fetchArticle', handlerArticle)
  },
  data() {
    return {
      title: 'Update Category Version',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle',
      currentCategoryVersion: 'categoryVersions/getCurrentCategoryVersion'
    }),
    editedArticle() {
      return {
        ...this.currentArticle,
        categories: this.currentCategoryVersion.categories
      }
    }
  },
  created() {
    this.info = cloneDeep(this.currentArticle)
  },
  methods: {
    ...mapActions({
      updateCategoryVersion: 'categoryVersions/updateCategoryVersion'
    }),
    doSave() {
      const data = {
        categories: this.$refs.articleCategoryVersionForm.getEditedCategories()
      }

      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.currentCategoryVersion.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated category version',
            'Your category version is successfully updated'
          )
          this.$router.push(`/articles/${response.getData().article.id}/details`)
        })

      this.updateCategoryVersion(handler)
    },
    doSaveForReview() {
      this.createArticleCategoryVersion(this.saveHandler)
    }
  }
}
</script>
