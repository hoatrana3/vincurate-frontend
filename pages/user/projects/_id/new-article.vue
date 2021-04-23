<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />
    <article-info-form @onSubmit="doCreateArticle" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
          'Project not found',
          'We can not find the project you want'
        )
        redirect('/user/projects')
      })
    await store.dispatch('projects/fetchProject', handler)
  },
  data() {
    return {
      title: 'Create Article'
    }
  },
  computed: mapGetters({
    currentProject: 'projects/getCurrentProject'
  }),
  methods: {
    ...mapActions({
      createArticle: 'articles/createArticle'
    }),
    async doCreateArticle(data) {
      const handler = this.$apiHandler
        .build()
        .setData({
          data: {
            ...data,
            projectId: this.currentProject.id
          }
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Created article',
            'Your article is successfully created'
          )
          this.$router.push(`/user/articles/${response.getData().id}`)
        })

      await this.createArticle(handler)
    }
  }
}
</script>
