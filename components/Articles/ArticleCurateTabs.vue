<template>
  <b-card>
    <b-tabs
      v-model="tabIndex">
      <b-tab v-if="$helpers.isSeqLabelProject(article.project)">
        <template #title>
          <div class="d-flex align-items-center">
            <md-icon v-text="'label_important'" class="mr-1" />
            <span>Sequence Labeling</span>
          </div>
        </template>
        <div class="pt-4">
          <article-seq-label-tab :article="article" />
        </div>
      </b-tab>
      <b-tab v-if="$helpers.isDocClassProject(article.project)">
        <template #title>
          <div class="d-flex align-items-center">
            <md-icon v-text="'class'" class="mr-1" />
            <span>Document Category</span>
          </div>
        </template>
        <div class="pt-4">
          <article-category-tab :article="article" />
        </div>
      </b-tab>
      <b-tab
        v-if="$helpers.isSeqTransProject(article.project)"
        title="Document Translation">
        <template #title>
          <div class="d-flex align-items-center">
            <md-icon v-text="'translate'" class="mr-1" />
            <span>Document Translation</span>
          </div>
        </template>
        <div class="pt-4">
          <article-translation-tab :article="article" />
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
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
    }
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  watch: {
    tabIndex() {
      this.$router.push(`${this.$route.path}?tab=${this.tabIndex}`)
    }
  },
  created() {
    this.tabIndex = parseInt(this.$route.query.tab) || 0
  }
}
</script>
