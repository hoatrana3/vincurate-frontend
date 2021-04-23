<template>
  <div>
    <article-seq-label-version-form
      ref="articleSeqLabelVersionForm"
      :article="article" />
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
</template>

<script>
import ArticleSeqLabelVersionForm from '@/components/Articles/ArticleSeqLabelVersionForm'
import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    ArticleSeqLabelVersionForm,
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    saveHandler() {
      const data = {
        annotations: this.$refs.articleSeqLabelVersionForm.getEditedAnnotations()
      }

      return this.$apiHandler
        .build()
        .setData({
          params: [this.article.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated article',
            'Your article annotations is successfully updated'
          )
        })
    }
  },
  created() {
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
