<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="Project concepts" />
      <article-seq-label-version-form
        ref="articleSeqLabelVersionForm"
        :article="editedArticle" />
      <b-btn
        variant="primary"
        class="mr-2"
        @click="doSave">
        Save labeling version
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
import ArticleSeqLabelVersionForm from '@/components/Articles/ArticleSeqLabelVersionForm'

export default {
  components: {
    ArticleSeqLabelVersionForm,
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
          'Article labeling version not found',
          'We can not find the article labeling version you want'
        )
        redirect('/articles')
      })
    await store.dispatch('seqLabelVersions/fetchSeqLabelVersion', handler)

    const currentSeqLabelVersion = store.getters['seqLabelVersions/getCurrentSeqLabelVersion']
    const handlerArticle = $apiHandler
      .build()
      .setData({ params: [currentSeqLabelVersion.article.id] })
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
      title: 'Update Labeling Version',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle',
      currentSeqLabelVersion: 'seqLabelVersions/getCurrentSeqLabelVersion'
    }),
    editedArticle() {
      return {
        ...this.currentArticle,
        annotations: this.currentSeqLabelVersion.annotations
      }
    }
  },
  created() {
    this.info = cloneDeep(this.currentArticle)
    this.setPickedFilters([])
  },
  methods: {
    ...mapActions({
      updateSeqLabelVersion: 'seqLabelVersions/updateSeqLabelVersion'
    }),
    ...mapMutations({
      setPickedFilters: 'articles/setPickedFilters'
    }),
    doSave() {
      const data = {
        annotations: this.$refs.articleSeqLabelVersionForm.getEditedAnnotations()
      }

      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.currentSeqLabelVersion.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated labeling version',
            'Your labeling version is successfully updated'
          )
          this.$router.push(`/articles/${response.getData().article.id}/details`)
        })

      this.updateSeqLabelVersion(handler)
    },
    doSaveForReview() {
      this.createArticleSeqLabelVersion(this.saveHandler)
    }
  }
}
</script>
