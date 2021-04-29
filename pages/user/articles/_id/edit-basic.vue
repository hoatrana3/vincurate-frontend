<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />
    <article-info-form :init-article="info" @onSubmit="doSave" />
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters, mapActions } from 'vuex'
import {
  PageHeader,
  PageSeparator
} from 'vue-luma'
import Page from '@/components/Page'
import ArticleInfoForm from '@/components/Articles/ArticleInfoForm'

export default {
  components: {
    ArticleInfoForm,
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
        redirect('/user/articles')
      })
    await store.dispatch('articles/fetchArticle', handler)
  },
  data() {
    return {
      title: 'Edit Article',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle'
    })
  },
  created() {
    this.info = cloneDeep(this.currentArticle)
  },
  methods: {
    ...mapActions({
      updateArticleInfo: 'articles/updateArticle'
    }),
    doSave(data) {
      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.info.id],
          data: {
            title: data.title,
            content: data.content
          }
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated article',
            'Your article is successfully updated'
          )
          this.$router.push(`/user/articles/${response.getData().id}`)
        })

      this.updateArticleInfo(handler)
    }
  }
}
</script>
