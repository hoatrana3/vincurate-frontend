<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="Project concepts" />
      <article-edit-version-form
        ref="articleEditVersionForm"
        :article="editedArticle" />
      <b-btn
        variant="primary"
        class="mr-2"
        @click="doSave">
        Save edit version
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
          'Article edit version not found',
          'We can not find the article edit version you want'
        )
        redirect('/articles')
      })
    await store.dispatch('editVersions/fetchEditVersion', handler)

    const currentEditVersion = store.getters['editVersions/getCurrentEditVersion']
    const handlerArticle = $apiHandler
      .build()
      .setData({ params: [currentEditVersion.article.id] })
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
      title: 'Update Edit Version',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle',
      currentEditVersion: 'editVersions/getCurrentEditVersion'
    }),
    editedArticle() {
      return {
        ...this.currentArticle,
        annotations: this.currentEditVersion.annotations
      }
    }
  },
  created() {
    this.info = cloneDeep(this.currentArticle)
    this.setPickedFilters([])
  },
  methods: {
    ...mapActions({
      updateEditVersion: 'editVersions/updateEditVersion'
    }),
    ...mapMutations({
      setPickedFilters: 'articles/setPickedFilters'
    }),
    doSave() {
      const data = {
        annotations: this.$refs.articleEditVersionForm.getEditedAnnotations()
      }

      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.currentEditVersion.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated edit version',
            'Your edit version is successfully updated'
          )
          this.$router.push(`/articles/${response.getData().article.id}/details`)
        })

      this.updateEditVersion(handler)
    },
    doSaveForReview() {
      this.createArticleEditVersion(this.saveHandler)
    }
  }
}
</script>
