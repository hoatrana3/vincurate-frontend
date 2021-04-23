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
                    placeholder="Search projects" />
                  <b-btn
                    variant="flush"
                    type="submit">
                    <md-icon v-text="'search'" />
                  </b-btn>
                </form>
              </div>
              <div class="col-lg d-flex flex-wrap align-items-center justify-content-end">
                <b-btn
                  :to="routeTo(routes.addProject)"
                  exact
                  variant="primary"
                  v-text="'Create project'" />
              </div>
            </div>
          </div>

          <my-projects-table />
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
import MyProjectsTable from '@/components/Projects/MyProjectsTable'

export default {
  components: {
    MyProjectsTable,
    MdIcon,
    PageHeader,
    PageSeparator
  },
  extends: Page,
  layout: 'boxed',
  data() {
    return {
      title: 'My Projects'
    }
  }
}
</script>
