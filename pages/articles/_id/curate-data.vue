<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator :title="currentArticle.project.type" />
      <article-edit-version-form
        ref="articleEditVersionForm"
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
import ArticleEditVersionForm from '@/components/Articles/ArticleEditVersionForm'

export default {
  components: {
    ArticleEditVersionForm,
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
      title: 'Curate Article',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle',
    }),
    saveHandler() {
      const data = {
        annotations: this.$refs.articleEditVersionForm.getEditedAnnotations()
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
            'Your article annotations is successfully updated'
          )
          this.$router.push(`/articles/${response.getData().id}/details`)
        })
    }
  },
  created() {
    this.info = cloneDeep(this.currentArticle)
    this.setPickedFilters([])
  },
  methods: {
    ...mapActions({
      updateArticleAnnotations: 'articles/updateArticleAnnotations',
      createArticleEditVersion: 'articles/createArticleEditVersion'
    }),
    ...mapMutations({
      setPickedFilters: 'articles/setPickedFilters'
    }),
    doSaveDirectly() {
      this.updateArticleAnnotations(this.saveHandler)
    },
    doSaveForReview() {
      this.createArticleEditVersion(this.saveHandler)
    }
  }
}
</script>
