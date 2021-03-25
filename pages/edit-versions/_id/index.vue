<template>
  <div>
    <page-header
      :title='title'
      :breadcrumb='breadcrumb'
      :class='containerClass' />

    <div class='container-fluid row page-section'>
      <div class='col-md-6'>
        <page-separator title='Origin Article' />
        <div class='card stack stack--2'>
          <article-content-edit-renderer
            ref='originArticleContent'
            :article='currentEditVersion.article'
            :comp-article='editedArticle'
            force-active
            class='card-body' />
        </div>
      </div>
      <div class='col-md-6'>
        <page-separator title='Edited Article' />
        <div class='card stack stack--2'>
          <article-content-edit-renderer
            ref='editedArticleContent'
            :article='editedArticle'
            :comp-article='currentEditVersion.article'
            force-active
            class='card-body' />
        </div>
      </div>
      <div class='col-md-12 d-flex align-items-center flex-column'>
        <b-form-checkbox v-model='onlyShowDiff'>
          Only highlight different texts
        </b-form-checkbox>
        <div class='d-flex flex-wrap mt-3'>
          <b-btn variant="primary" class="mr-2">Approve</b-btn>
          <b-dropdown text="Merge" variant="warning" class="mr-2">
            <b-dropdown-item href="#">Prefer origin</b-dropdown-item>
            <b-dropdown-item href="#">Prefer edited version</b-dropdown-item>
          </b-dropdown>
          <b-btn variant="accent">Decline</b-btn>
        </div>
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
import ArticleContentEditRenderer from '../../../components/Articles/ArticleContentEditRenderer'

export default {
  components: {
    ArticleContentEditRenderer,
    PageHeader,
    PageSeparator
  },
  extends: Page,
  layout: 'fixed',
  async asyncData({ store, params, $apiHandler, $notify, redirect }) {
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
      currentUser: 'users/getCurrentUser',
      getOnlyShowDiff: 'editVersions/getOnlyShowDiff'
    }),
    editedArticle() {
      const { article: { content }, annotations, user } = this.currentEditVersion
      return {
        ...this.currentEditVersion,
        content,
        lastCurator: user
      }
    },
    onlyShowDiff: {
      get() {
        return this.getOnlyShowDiff
      },
      set(val) {
        this.setOnlyShowDiff(val)
      }
    }
  },
  created() {
    this.info = cloneDeep(this.currentEditVersion)
    this.setPickedFilters([])
  },
  methods: {
    ...mapMutations({
      setPickedFilters: 'articles/setPickedFilters',
      setOnlyShowDiff: 'editVersions/setOnlyShowDiff'
    })
  }
}
</script>
