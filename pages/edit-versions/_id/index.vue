<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="Edit Version Annotations" />
      <div class="card stack stack--2">
<!--        <article-content-renderer-->
<!--          ref="articleContent"-->
<!--          id="article-content"-->
<!--          :article="currentArticle"-->
<!--          editable-->
<!--          force-active-->
<!--          class="card-body" />-->
      </div>
<!--      <b-btn-->
<!--        variant="primary"-->
<!--        class="mr-2"-->
<!--        @click="doSaveForReview">-->
<!--        Save for reviewing-->
<!--      </b-btn>-->
<!--      <b-btn-->
<!--        variant="accent"-->
<!--        @click="doSaveDirectly">-->
<!--        Save to origin data-->
<!--      </b-btn>-->
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {
  PageHeader,
  PageSeparator
} from 'vue-luma'
import Page from '@/components/Page'
import ArticleContentRenderer from '@/components/Articles/ArticleContentRenderer'

export default {
  components: {
    PageHeader,
    PageSeparator
  },
  extends: Page,
  layout: 'boxed',
  async asyncData({ store, params, $apiHandler, $notify, redirect }) {
    console.log(params)
    const handler = $apiHandler
      .build()
      .setData({ params: [params.id] })
      .addOnError((e) => {
        $notify.error(
          'Article edit version not found',
          'We can not find the article edit version you want'
        )
        redirect('/articles')
      })
    await store.dispatch('editVersions/fetchEditVersion', handler)
  },
  data() {
    return {
      title: 'Review Edit Version',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentEditVersion: 'editVersions/getCurrentEditVersion',
      currentUser: 'users/getCurrentUser'
    }),
  },
  created() {
    this.info = cloneDeep(this.currentEditVersion)
    this.setPickedFilters([])
  },
  methods: {
    ...mapMutations({
      setPickedFilters: 'articles/setPickedFilters',
    }),
  }
}
</script>
