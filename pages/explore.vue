<template>
  <div class="articles_explore">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="containerClass" />
    <div class="page-section">
      <articles-explore :class="containerClass" />
    </div>
  </div>
</template>

<script>
import Page from '@/components/Page.vue'
import { PageHeader } from 'vue-luma'
import ArticlesExplore from '@/components/Articles/ArticlesExplore'

export default {
  components: {
    ArticlesExplore,
    PageHeader
  },
  extends: Page,
  layout: 'fixed',
  data() {
    return {
      title: 'Explore Articles'
    }
  }
}
</script>
