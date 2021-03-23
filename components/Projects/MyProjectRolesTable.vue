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

      <template #cell(actions)="data">
        <b-btn variant="light" size="sm" pill @click="() => removeRole(data.item)">
          <md-icon v-text="'close'" />
        </b-btn>
      </template>
    </b-table>

    <div class="card-footer d-flex align-items-center">
      <custom-pager
        v-model="page"
        :rows="roles.length"
        :per-page="per"
        class="m-0" />
      <div class="ml-auto">
        Total Roles
        <md-icon>remove</md-icon>
        <strong>{{ roles.length }}</strong>
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
    roles: {
      type: Array,
      default: () => []
    },
    noActions: {
      type: Boolean,
      default: false
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
        key: 'name',
        label: 'Fullname'
      }, {
        key: 'email',
        label: 'Email'
      }, {
        key: 'role',
        label: 'Role'
      }]

      if (!this.noActions) fields.push({
        key: 'actions',
        label: 'Actions'
      })

      return fields
    },
    paginatedItems() {
      const start = (this.page - 1) * this.per
      let items = this.roles.slice(start, start + this.per)

      return items || []
    }
  },
  methods: {
    removeRole(role) {
      this.$emit('removeRole', role)
    }
  }
}
</script>
