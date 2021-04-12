<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="Fill your translation" />
      <article-translation-version-form
        ref="articleTranslationVersionForm"
        :article="editedArticle"
        :for-new="false" />
      <b-btn
        variant="primary"
        class="mr-2"
        @click="doSave">
        Save translation version
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
          'Article translation version not found',
          'We can not find the article translation version you want'
        )
        redirect('/articles')
      })
    await store.dispatch('translationVersions/fetchTranslationVersion', handler)

    const currentTranslationVersion = store.getters['translationVersions/getCurrentTranslationVersion']
    const handlerArticle = $apiHandler
      .build()
      .setData({ params: [currentTranslationVersion.article.id] })
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
      title: 'Update Translation Version',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle',
      currentTranslationVersion: 'translationVersions/getCurrentTranslationVersion'
    }),
    editedArticle() {
      return {
        ...this.currentArticle,
        translation: this.currentTranslationVersion.translation
      }
    }
  },
  created() {
    this.info = cloneDeep(this.currentArticle)
  },
  methods: {
    ...mapActions({
      updateTranslationVersion: 'translationVersions/updateTranslationVersion'
    }),
    doSave() {
      const data = {
        translation: this.$refs.articleTranslationVersionForm.getEditedTranslation()
      }

      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.currentTranslationVersion.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated translation version',
            'Your translation version is successfully updated'
          )
          this.$router.push(`/articles/${response.getData().article.id}/details`)
        })

      this.updateTranslationVersion(handler)
    }
  }
}
</script>
