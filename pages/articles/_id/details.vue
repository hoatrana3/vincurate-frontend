<template>
  <div>
    <page-header
      :title='title'
      :breadcrumb='breadcrumb'
      :container-class='containerClass' />
    <div class='page-section'>
      <div :class='containerClass'>
        <article-info />
      </div>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Page'
import ArticleInfo from '../../../components/Articles/ArticleInfo'

export default {
  components: { ArticleInfo },
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
      title: 'Article Details'
    }
  }
}
</script>
