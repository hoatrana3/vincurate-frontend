<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator
      :title="$t(title)" />

    <b-form @submit.prevent="doSave" class="col-sm-5 px-0 page-section pt-0">
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
        label="Source"
        label-for="source"
        label-class="form-label">
        <b-form-input
          v-model="info.source"
          id="source"
          placeholder="Source of article" />
      </b-form-group>

      <b-form-group
        label="Category"
        label-for="category"
        label-class="form-label">
        <b-select
          v-model="info.category"
          id="category"
          :options="['News', 'Others']" />
      </b-form-group>

      <b-form-group
        label="Visibility"
        label-for="visibility"
        label-class="form-label">
        <b-select
          v-model="info.visibility"
          id="visibility"
          :options="['Draft', 'Private', 'Public']" />
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
    PageSeparator,
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
        source: this.info.source,
        category: this.info.category,
        visibility: this.info.visibility,
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
          this.info = response.getData()
        })

      this.updateArticleInfo(handler)
    }
  }
}
</script>
