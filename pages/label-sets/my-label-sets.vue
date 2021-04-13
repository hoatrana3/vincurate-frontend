<template>
  <div>
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="containerClass" />
    <div class="page-section">
      <div :class="containerClass">
        <div class="row mb-3">
          <div class="col-md-10">
            <form class="search-form search-form--light w-100 d-lg-inline-flex mb-8pt mb-lg-0">
              <b-form-input
                v-model="searchInput"
                placeholder="Search for label sets" />
              <b-btn
                variant="flush"
                type="submit"
                size="lg">
                <md-icon v-text="'search'" />
              </b-btn>
            </form>
          </div>
          <div class="col-md-2">
            <b-btn
              block
              variant="primary"
              to="/label-sets/new">
              <md-icon v-text="'add'" class="mr-2" />
              Add new
            </b-btn>
          </div>
        </div>

        <small
          class="d-block text-black-70 text-headings text-uppercase mb-3"
          v-text="`Displaying ${Math.min(perPage, paginatedItems.length)} out of ${labelSets.length} label sets`" />

        <div class="row">
          <div
            v-for="(item, index) in paginatedItems"
            :key="`${item.name}-${index}`"
            class="col-md-4">
            <div class="card stack stack--1">
              <div class="card-body d-flex flex-column">
                <div class="d-flex align-items-center">
                  <div class="flex">
                    <div class="d-flex align-items-center">
                      <div class="rounded mr-12pt">
                        <md-icon>folder_open</md-icon>
                      </div>
                      <div class="flex">
                        <div class="card-title">{{ item.name }}</div>
                        <p class="flex text-black-50 lh-1 mb-0">
                          <small>Contains {{ item.labels.length }} label(s)</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <b-link
                    v-b-tooltip.hover.top="'See details'"
                    :to="`label-sets/${item.id}`"
                    class="ml-4pt material-icons text-20 card-course__icon-favorite">
                    arrow_forward_ios
                  </b-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <custom-pager
          v-model="currentPage"
          :rows="labelSets.length"
          :per-page="perPage" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  MdIcon,
  PageHeader,
} from 'vue-luma'
import CustomPager from '@/components/General/CustomPager'
import Page from '@/components/Page'

export default {
  components: {
    PageHeader,
    CustomPager,
    MdIcon
  },
  extends: Page,
  layout: 'boxed',
  async asyncData({ store, $apiHandler }) {
    const userId = store.getters['users/getCurrentUser'].id
    const handler = $apiHandler
      .build()
      .setData({ params: [userId] })
      .addOnResponse((response) => {
        this.labelSets = response.getData()
      })
    await store.dispatch('users/getUserLabelSets', handler)
  },
  data() {
    return {
      title: 'My Label Sets',
      labelSets: [],
      searchInput: '',
      currentPage: 1,
      perPage: 12
    }
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.perPage
      const filteredItems = this.labelSets.filter(ls => ls.name.toLowerCase().includes(this.searchInput.toLowerCase()))
      let items = filteredItems.slice(start, start + this.perPage)

      return items || []
    }
  }
}
</script>
