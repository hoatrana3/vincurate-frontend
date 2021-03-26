<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />

    <b-form @submit.prevent="doSave" class="px-0 page-section pt-0">
      <b-form-group
        label="Title"
        label-for="title"
        label-class="form-label">
        <b-form-input
          v-model="info.title"
          id="title"
          placeholder="Title of article" />
      </b-form-group>

      <b-form-group
        label="Content"
        label-for="content"
        label-class="form-label">
        <b-form-textarea
          v-model="info.content"
          id="content"
          size="md"
          rows="10"
          max-rows="20"
          placeholder="Content of article" />
        <template v-slot:description>
          <span class="text-danger font-weight-medium">
            (*) Old annotations <u>might be wrong</u> after you change the article's content
          </span>
        </template>
      </b-form-group>

      <b-btn type="submit" variant="primary">
        Save Changes
      </b-btn>
    </b-form>
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

export default {
  components: {
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
    doSave() {
      const data = {
        title: this.info.title,
        content: this.info.content
      }
      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.info.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated article',
            'Your article is successfully updated'
          )
          this.$router.push(`/articles/${response.getData().id}/details`)
        })

      this.updateArticleInfo(handler)
    }
  }
}
</script>
