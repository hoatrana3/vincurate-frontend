<template>
  <div>
    <fmv-box
      effects="parallax-background blend-background"
      :box-image="headerImage"
      class="mdk-box--bg-dark bg-dark mb-0">

      <vincurate-home-hero v-bind="headerContentComponentProps" />
    </fmv-box>

    <div class="bg-white border-bottom-2 py-16pt">
      <div :class="containerClass">
        <div class="row align-items-center">
          <div class="d-flex col-md align-items-center border-bottom border-md-0 mb-16pt mb-md-0 pb-16pt pb-md-0">
            <div
              class="rounded-circle bg-primary w-64 h-64 d-inline-flex align-items-center justify-content-center mr-16pt">
              <md-icon class="material-icons text-white">notes</md-icon>
            </div>
            <div class="flex">
              <div class="card-title mb-4pt">5.000+ Articles</div>
              <p class="card-subtitle text-black-70">Explore a wide world of curated article.</p>
            </div>
          </div>
          <div class="d-flex col-md align-items-center border-bottom border-md-0 mb-16pt mb-md-0 pb-16pt pb-md-0">
            <div
              class="rounded-circle bg-primary w-64 h-64 d-inline-flex align-items-center justify-content-center mr-16pt">
              <md-icon class="material-icons text-white">verified_user</md-icon>
            </div>
            <div class="flex">
              <div class="card-title mb-4pt">Qualified data</div>
              <p class="card-subtitle text-black-70">Accurate and quality data.</p>
            </div>
          </div>
          <div class="d-flex col-md align-items-center">
            <div
              class="rounded-circle bg-primary w-64 h-64 d-inline-flex align-items-center justify-content-center mr-16pt">
              <md-icon class="material-icons text-white">people</md-icon>
            </div>
            <div class="flex">
              <div class="card-title mb-4pt">Community support</div>
              <p class="card-subtitle text-black-70">Everyone can give a hand to make better curating data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <feedback-page-section-carousel :container-class="containerClass" />

  </div>
</template>

<script>
import Page from '~/components/Page'
import { FmvBox } from 'fmv-layout'
import {
  FeedbackPageSectionCarousel
} from 'vue-luma'
import VincurateHomeHero from '~/components/Home/VincurateHomeHero'

export default {
  components: {
    VincurateHomeHero,
    FeedbackPageSectionCarousel,
    FmvBox
  },
  extends: Page,
  data() {
    return {
      title: this.$t('Home')
    }
  },
  computed: {
    guest() {
      return true
    },
    localPageHeader() {
      return this.$root.layoutName !== 'fixed'
    },
    headerClass() {
      if (this.$root.layoutName === 'fixed') {
        return 'mdk-header--bg-dark bg-dark mb-0'
      }
    },
    headerEffects() {
      if (this.$root.layoutName === 'fixed') {
        return 'parallax-background waterfall'
      }
    },
    headerImage() {
      return '/images/newspaper-2253408_1920.jpg'
    },
    headerContentClass() {
      if (this.$root.layoutName === 'fixed') {
        return 'justify-content-center'
      }
    },
    headerCondenses() {
      return this.$root.layoutName === 'fixed'
    },
  },
  async asyncData({ app }) {
    return {
      title: app.i18n.t('Home')
    }
  }
}
</script>
