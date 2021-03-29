<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="Sequence Labeling" />
      <article-seq-label-version-form
        ref="articleSeqLabelVersionForm"
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
        annotations: this.$refs.articleSeqLabelVersionForm.getEditedAnnotations()
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
      createArticleSeqLabelVersion: 'articles/createArticleSeqLabelVersion'
    }),
    ...mapMutations({
      setPickedFilters: 'articles/setPickedFilters'
    }),
    doSaveDirectly() {
      this.updateArticleAnnotations(this.saveHandler)
    },
    doSaveForReview() {
      this.createArticleSeqLabelVersion(this.saveHandler)
    }
  }
}
</script>
