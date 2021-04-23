<template>
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
              placeholder="Search versions" />
            <b-btn
              variant="flush"
              type="submit">
              <md-icon v-text="'search'" />
            </b-btn>
          </form>
        </div>
        <div class="col-lg d-flex flex-wrap align-items-center justify-content-end">
          <slot name="table-left-header" />
        </div>
      </div>
    </div>
    <b-table
      ref="table"
      :items="paginatedItems"
      :fields="fields"
      sort-by="createdAt"
      sort-desc
      bordered
      head-variant="dark"
      class="mb-0">

      <template #cell(index)="data">
        {{ (data.index + 1) + (page - 1) * per }}
      </template>

      <template #cell(user)="data">
        <b-link to="#">{{ data.item.user.name }}</b-link>
      </template>

      <template #cell(categoriesCount)="data">
        {{ data.item.categories.length }}
      </template>

      <template #cell(actions)="{item: {id}}">
        <b-dd
          variant="flush"
          toggle-class="text-muted"
          no-caret
          right>

          <template v-slot:button-content>
            <md-icon class="icon-24pt">more_vert</md-icon>
          </template>

          <b-dd-item :to="`/user/category-versions/${id}`">Review</b-dd-item>
          <b-dd-item :to="`/user/category-versions/${id}/edit`">Edit</b-dd-item>
        </b-dd>
      </template>
    </b-table>

    <div class="card-footer d-flex align-items-center">
      <custom-pager
        v-model="page"
        :rows="categoryVersions.length"
        :per-page="per"
        class="m-0" />
      <div class="ml-auto">
        Total Category Versions
        <md-icon>remove</md-icon>
        <strong>{{ categoryVersions.length }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import {
  routeToMixin,
  tableSortMixin,
  MdIcon
} from 'vue-luma'
import CustomPager from '@/components/General/CustomPager'

export default {
  components: {
    CustomPager,
    MdIcon
  },
  mixins: [
    routeToMixin,
    tableSortMixin
  ],
  props: {
    categoryVersions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      page: 1,
      per: 5
    }
  },
  computed: {
    fields() {
      const fields = [{
        key: 'index',
        label: '#'
      }, {
        key: 'user',
        label: 'User'
      }, {
        key: 'categoriesCount',
        label: 'Category Count'
      }, {
        key: 'status',
        label: 'Status'
      }, {
        key: 'actions',
        label: ''
      }]

      return fields
    },
    paginatedItems() {
      const start = (this.page - 1) * this.per
      let items = this.categoryVersions.slice(start, start + this.per)

      return items || []
    }
  }
}
</script>
