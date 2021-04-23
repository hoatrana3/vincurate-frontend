<template>
  <div>
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :class="containerClass" />

    <div class="container-fluid row page-section">
      <div class="col-md-6">
        <page-separator title="Origin Article" />
        <div class="card stack stack--2">
          <article-content-edit-renderer
            ref="originArticleContent"
            :article="currentSeqLabelVersion.article"
            :comp-article="editedArticle"
            force-active
            class="card-body" />
        </div>
      </div>
      <div class="col-md-6">
        <page-separator title="Edited Article" />
        <div class="card stack stack--2">
          <article-content-edit-renderer
            ref="editedArticleContent"
            :article="editedArticle"
            :comp-article="currentSeqLabelVersion.article"
            force-active
            class="card-body" />
        </div>
      </div>
      <div class="col-md-12 d-flex align-items-center flex-column">
        <b-form-checkbox v-model="onlyShowDiff">
          Only highlight different texts
        </b-form-checkbox>
        <div class="d-flex flex-wrap mt-2" v-if="currentSeqLabelVersion.status === 'Pending'">
          <b-btn variant="success" class="mr-2" @click="doApprove">Approve</b-btn>
          <b-dropdown text="Merge" variant="warning" class="mr-2">
            <b-dropdown-item href="#" @click="() => doMerge(true)">Prefer origin</b-dropdown-item>
            <b-dropdown-item href="#" @click="() => doMerge(false)">Prefer edited version</b-dropdown-item>
          </b-dropdown>
          <b-btn variant="accent" @click="doDecline">Decline</b-btn>
        </div>
        <div class="mt-3 text-center" v-else>
          <h2 class="font-weight-bold text-underline text-uppercase mb-0" :class="getTextColorByStatus()">
            {{ currentSeqLabelVersion.status }}
          </h2>
          <div class="text-black-70">
            by <b-link to="#">{{ currentSeqLabelVersion.lastApprover.name }}</b-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { PageHeader, PageSeparator } from 'vue-luma'
import Page from '@/components/Page'
import ArticleContentEditRenderer from '../../../../components/Articles/ArticleContentEditRenderer'

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
          'Article labeling version not found',
          'We can not find the article labeling version you want'
        )
        redirect('/user/articles')
      })
    await store.dispatch('seqLabelVersions/fetchSeqLabelVersion', handler)
  },
  data() {
    return {
      title: 'Review Labeling Version',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentSeqLabelVersion: 'seqLabelVersions/getCurrentSeqLabelVersion',
      currentUser: 'users/getCurrentUser',
      getOnlyShowDiff: 'seqLabelVersions/getOnlyShowDiff'
    }),
    editedArticle() {
      const {
        article: { content },
        user
      } = this.currentSeqLabelVersion
      return {
        ...this.currentSeqLabelVersion,
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
    this.info = cloneDeep(this.currentSeqLabelVersion)
    this.setPickedFilters([])
  },
  methods: {
    ...mapMutations({
      setPickedFilters: 'articles/setPickedFilters',
      setOnlyShowDiff: 'seqLabelVersions/setOnlyShowDiff'
    }),
    ...mapActions({
      applySeqLabelVersionInfo: 'seqLabelVersions/applySeqLabelVersion'
    }),
    doApprove() {
      this.doApply(this.currentSeqLabelVersion.annotations, 'Approved')
    },
    doDecline() {
      this.doApply(this.currentSeqLabelVersion.annotations, 'Declined')
    },
    doMerge(preferOrigin = true) {
      const editedDiffs = this.$refs.editedArticleContent.getDiffAnnos()
      const originDiffs = this.$refs.originArticleContent.getDiffAnnos()
      const sourceDiffs = preferOrigin ? this.currentSeqLabelVersion.article.annotations : this.currentSeqLabelVersion.annotations
      const filterDiffs = preferOrigin ? editedDiffs : originDiffs
      const mergeableDiffs = [
        ...sourceDiffs,
        ...filterDiffs.filter(anno => {
          const index = sourceDiffs.findIndex(anno1 => {
            const leftLimit = Math.max(anno.offsetStart, anno1.offsetStart)
            const rightLimit = Math.min(anno.offsetEnd, anno1.offsetEnd)

            return leftLimit <= rightLimit
          })

          return index < 0
        })
      ].sort((a1, a2) => a1.offsetEnd - a2.offsetEnd)

      this.doApply(mergeableDiffs, 'Merged')
    },
    doApply(annotations, status) {
      const data = {
        annotations,
        status

      }

      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.currentSeqLabelVersion.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Applied review labeling version',
            'Your labeling version is successfully applied review'
          )
          this.$router.push(`/user/articles/${response.getData().article.id}`)
        })

      this.applySeqLabelVersionInfo(handler)
    },
    getTextColorByStatus() {
      switch (this.currentSeqLabelVersion.status) {
        case 'Declined':
          return 'text-danger'
        case 'Approved':
          return 'text-success'
        default:
          return 'text-warning'
      }
    }
  }
}
</script>
