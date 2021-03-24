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
              placeholder="Search roles" />
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

      <template #cell(annotationCount)="data">
        {{ data.item.annotations.length }}
      </template>

      <template #cell(actions)="{item: {id}}">
        <b-btn
          variant="light"
          size="sm"
          pill
          :to="`/edit-versions/${id}`">
          <md-icon v-text="'playlist_add_check'" />
        </b-btn>
      </template>
    </b-table>

    <div class="card-footer d-flex align-items-center">
      <custom-pager
        v-model="page"
        :rows="editVersions.length"
        :per-page="per"
        class="m-0" />
      <div class="ml-auto">
        Total Edit Versions
        <md-icon>remove</md-icon>
        <strong>{{ editVersions.length }}</strong>
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
    editVersions: {
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
        key: 'annotationCount',
        label: 'Annotation Count'
      }, {
        key: 'status',
        label: 'Status'
      }, {
        key: 'actions',
        label: 'Actions'
      }]

      return fields
    },
    paginatedItems() {
      const start = (this.page - 1) * this.per
      let items = this.editVersions.slice(start, start + this.per)

      return items || []
    }
  }
}
</script>
