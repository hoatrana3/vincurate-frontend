<template>
  <div>
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="containerClass" />
    <div class="page-section">
      <div :class="containerClass">

        <page-separator
          :title="title" />

        <div class="card mb-0">
          <div class="card-header">
            <div
              class="row align-items-center"
              style="white-space: nowrap;">
              <div class="col-lg-auto">
                <form
                  class="search-form search-form--light d-lg-inline-flex mb-8pt mb-lg-0">
                  <b-form-input
                    class="w-lg-auto"
                    placeholder="Search categories" />
                  <b-btn
                    variant="flush"
                    type="submit">
                    <md-icon v-text="'search'" />
                  </b-btn>
                </form>
              </div>
              <div class="col-lg d-flex flex-wrap align-items-center justify-content-end">
                <b-btn
                  exact
                  :to="`/user/categories/new`"
                  variant="primary"
                  v-text="'Add category'" />
              </div>
            </div>
          </div>

          <my-categories-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  MdIcon,
  PageHeader,
  PageSeparator
} from 'vue-luma'
import Page from '@/components/Page'
import MyCategoriesTable from '@/components/Category/MyCategoriesTable'

export default {
  components: {
    MyCategoriesTable,
    MdIcon,
    PageHeader,
    PageSeparator
  },
  extends: Page,
  layout: 'boxed',
  data() {
    return {
      title: 'My Categories'
    }
  }
}
</script>
