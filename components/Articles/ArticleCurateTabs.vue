<template>
  <b-tabs
    v-model="tabIndex"
    pills>
    <b-tab
      v-if="$helpers.isSeqLabelProject(article.project)"
      title="Sequence Labeling">
      <div class="pt-4">
        <article-seq-label-tab :article="article" />
      </div>
    </b-tab>
    <b-tab
      v-if="$helpers.isDocClassProject(article.project)"
      title="Document Category">
      <div class="pt-4">
        <article-category-tab :article="article" />
      </div>
    </b-tab>
    <b-tab
      v-if="$helpers.isSeqTransProject(article.project)"
      title="Document Translation">
      <div class="pt-4">
        <article-translation-tab :article="article" />
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import ArticleSeqLabelTab from '@/components/Articles/ArticleSeqLabelTab'
import ArticleCategoryTab from '@/components/Articles/ArticleCategoryTab'
import ArticleTranslationTab from '@/components/Articles/ArticleTranslationTab'

export default {
  components: { ArticleTranslationTab, ArticleCategoryTab, ArticleSeqLabelTab },
  props: {
    article: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  watch: {
    tabIndex() {
      this.$router.push(`/projects/${this.article.project.id}/annotate/${this.article.id}?tab=${this.tabIndex}`)
    }
  },
  created() {
    this.tabIndex = parseInt(this.$route.query.tab) || 0
  }
}
</script>
