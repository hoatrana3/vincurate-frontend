<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="Fill your translation" />
      <article-translation-version-form
        ref="articleTranslationVersionForm"
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
import { mapGetters, mapActions } from 'vuex'
import {
  PageHeader,
  PageSeparator
} from 'vue-luma'
import Page from '@/components/Page'
import ArticleTranslationVersionForm from '@/components/Articles/ArticleTranslationVersionForm'

export default {
  components: {
    ArticleTranslationVersionForm,
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
      title: '' +
        'Translate Article',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle',
    }),
    saveHandler() {
      const data = {
        translation: this.$refs.articleTranslationVersionForm.getEditedTranslation(),
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
            'Your article translation is successfully updated'
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
      updateArticleTranslation: 'articles/updateArticleTranslation',
      createArticleTranslationVersion: 'articles/createArticleTranslationVersion'
    }),
    doSaveDirectly() {
      this.updateArticleTranslation(this.saveHandler)
    },
    doSaveForReview() {
      this.createArticleTranslationVersion(this.saveHandler)
    }
  }
}
</script>
