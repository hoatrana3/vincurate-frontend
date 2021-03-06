<template>
  <div
    :class="containerClass"
    class="hero text-center text-md-left py-112pt">
    <h1 class="text-white text-shadow">
      World of curated articles
    </h1>
    <p class="lead measure-hero-lead mx-auto mx-md-0 text-white text-shadow">
      Accurate, Fast and Quality Articles curated by everyone.
      <br>
      Explore the wide world of curated articles.
    </p>
    <form
      class="search-form search-form--light w-100 d-lg-inline-flex mb-8pt mb-lg-0"
      @submit.prevent="searchByInput">
      <b-form-input
        v-model="searchInput"
        placeholder="Search for somethings?"
        size="lg" />
      <b-btn
        variant="flush"
        type="submit"
        size="lg">
        <md-icon v-text="'search'" />
      </b-btn>
    </form>
  </div>
</template>

<script>
import { HomeHero } from 'vue-luma'

export default {
  extends: HomeHero,
  data() {
    return {
      searchInput: ''
    }
  },
  methods: {
    searchByInput() {
      this.$router.push(`/guest/search-articles?q=${this.searchInput}`)
    }
  }
}
</script>
