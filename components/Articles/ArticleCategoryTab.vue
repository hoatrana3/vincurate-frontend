<template>
  <div>
    <article-category-version-form
      ref="articleCategoryVersionForm"
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
import { mapActions } from 'vuex'
import ArticleCategoryVersionForm from '@/components/Articles/ArticleCategoryVersionForm'

export default {
  components: {
    ArticleCategoryVersionForm,
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
        categories: this.$refs.articleCategoryVersionForm.getEditedCategories()
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
            'Your article categories is successfully updated'
          )
        })
    }
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
