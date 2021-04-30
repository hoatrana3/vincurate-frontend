<template>
  <div>
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :class="containerClass" />

    <div class="container-fluid row page-section">
      <div class="col-md-6">
        <page-separator title="Origin Content" />
        <b-card class="stack stack--2">
          <span class="font-size-20pt">{{ currentTranslationVersion.article.content }}</span>
        </b-card>
      </div>
      <div class="col-md-6">
        <page-separator title="Translated Content" />
        <b-card class="stack stack--2">
          <span class="font-size-20pt">{{ currentTranslationVersion.translation.content }}</span>
        </b-card>
      </div>
      <div class="col-md-12 d-flex align-items-center flex-column">
        <div class="d-flex flex-wrap mt-2" v-if="currentTranslationVersion.status === 'Pending'">
          <b-btn variant="success" class="mr-2" @click="doApprove">Approve</b-btn>
          <b-btn variant="accent" @click="doDecline">Decline</b-btn>
        </div>
        <div class="mt-3 text-center" v-else>
          <h2 class="font-weight-bold text-underline text-uppercase mb-0" :class="getTextColorByStatus()">
            {{ currentTranslationVersion.status }}
          </h2>
          <div class="text-black-70">
            by
            <b-link to="#">{{ currentTranslationVersion.lastApprover.name }}</b-link>
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

export default {
  components: {
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
          'Article translation version not found',
          'We can not find the article translation version you want'
        )
        redirect('/user/articles')
      })
    await store.dispatch('translationVersions/fetchTranslationVersion', handler)
  },
  data() {
    return {
      title: 'Review Translation Version',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentTranslationVersion: 'translationVersions/getCurrentTranslationVersion',
      currentUser: 'users/getCurrentUser'
    })
  },
  created() {
    this.info = cloneDeep(this.currentTranslationVersion)
  },
  methods: {
    ...mapActions({
      applyTranslationVersionInfo: 'translationVersions/applyTranslationVersion'
    }),
    doApprove() {
      this.doApply(this.currentTranslationVersion.translation, 'Approved')
    },
    doDecline() {
      this.doApply(this.currentTranslationVersion.translation, 'Declined')
    },
    doApply(translation, status) {
      const data = {
        translation,
        status
      }

      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.currentTranslationVersion.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Applied review translation version',
            'Your translation version is successfully applied review'
          )
          this.$router.push(`/user/articles/${response.getData().article.id}`)
        })

      this.applyTranslationVersionInfo(handler)
    },
    getTextColorByStatus() {
      switch (this.currentTranslationVersion.status) {
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
