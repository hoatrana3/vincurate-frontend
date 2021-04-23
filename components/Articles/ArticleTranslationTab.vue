<template>
  <div>
    <article-translation-version-form
      ref="articleTranslationVersionForm"
      :article="article" />
    <b-btn
      variant="primary"
      class="mr-2"
      @click="doSaveForReview">
      Save for reviewing
    </b-btn>
    <b-btn
      v-if="$helpers.isCurrentUserApprover(article.project) || $helpers.isCurrentUserProjectAdmin(article.project)"
      variant="accent"
      @click="doSaveDirectly">
      Save to origin data
    </b-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ArticleTranslationVersionForm from '@/components/Articles/ArticleTranslationVersionForm'

export default {
  components: {
    ArticleTranslationVersionForm,
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
        translation: this.$refs.articleTranslationVersionForm.getEditedTranslation(),
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
            'Your article translation is successfully updated'
          )
        })
    }
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
