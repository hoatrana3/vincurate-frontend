<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :class="containerClass" />

    <div class="container-fluid row page-section">
      <div class="col-md-6">
        <page-separator title="Origin Categories" />
        <b-card>
          <span
            v-for="category in currentCategoryVersion.article.categories"
            :key="category.id"
            class="has-category mr-2">
            {{ category.value }}
          </span>
        </b-card>
      </div>
      <div class="col-md-6">
        <page-separator title="Edited Categories" />
        <b-card>
          <span
            v-for="category in currentCategoryVersion.categories"
            :key="category.id"
            class="has-category mr-2">
            {{ category.value }}
          </span>
        </b-card>
      </div>
      <div class="col-md-12 d-flex align-items-center flex-column">
        <div class="d-flex flex-wrap mt-2" v-if="currentCategoryVersion.status === 'Pending'">
          <b-btn variant="success" class="mr-2" @click="doApprove">Approve</b-btn>
          <b-btn variant="accent" @click="doDecline">Decline</b-btn>
        </div>
        <div class="mt-3 text-center" v-else>
          <h2 class="font-weight-bold text-underline text-uppercase mb-0" :class="getTextColorByStatus()">
            {{ currentCategoryVersion.status }}
          </h2>
          <div class="text-black-70">
            by
            <b-link to="#">{{ currentCategoryVersion.lastApprover.name }}</b-link>
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
          'Article category version not found',
          'We can not find the article category version you want'
        )
        redirect('/user/articles')
      })
    await store.dispatch('categoryVersions/fetchCategoryVersion', handler)
  },
  data() {
    return {
      title: 'Review Category Version',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentCategoryVersion: 'categoryVersions/getCurrentCategoryVersion',
      currentUser: 'users/getCurrentUser'
    })
  },
  created() {
    this.info = cloneDeep(this.currentCategoryVersion)
  },
  methods: {
    ...mapActions({
      applyCategoryVersionInfo: 'categoryVersions/applyCategoryVersion'
    }),
    doApprove() {
      this.doApply(this.currentCategoryVersion.categories, 'Approved')
    },
    doDecline() {
      this.doApply(this.currentCategoryVersion.categories, 'Declined')
    },
    doApply(categories, status) {
      const data = {
        categories,
        status
      }

      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.currentCategoryVersion.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Applied review category version',
            'Your category version is successfully applied review'
          )
          this.$router.push(`/user/articles/${response.getData().article.id}`)
        })

      this.applyCategoryVersionInfo(handler)
    },
    getTextColorByStatus() {
      switch (this.currentCategoryVersion.status) {
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
