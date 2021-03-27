<template>
  <div>
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

      <template #cell(name)="data">
        <b-link to="#">{{ data.value }}</b-link>
      </template>

      <template #cell(projectsCount)="data">
        {{ data.item.projects.length }}
      </template>

      <template #cell(status)="data">
        <b-badge
          :variant="data.item.isActive ? 'success' : 'danger'"
          pill>
          {{ data.item.isActive ? 'Active' : 'Blocked' }}
        </b-badge>
      </template>

      <template #cell(createdAt)="data">
        {{ $helpers.formatTimeAgo(data.value) }}
      </template>

      <template #cell(actions)="data">
        <b-dd
          variant="flush"
          toggle-class="text-muted"
          no-caret
          right>

          <template v-slot:button-content>
            <md-icon class="icon-24pt">more_vert</md-icon>
          </template>

          <b-dd-item @click="() => toggleActive(data.item)">
            {{ data.item.isActive ? 'Block' : 'Unblock' }}
          </b-dd-item>
        </b-dd>
      </template>

    </b-table>

    <div class="card-footer d-flex align-items-center">
      <custom-pager
        v-model="page"
        :rows="users.length"
        :per-page="per"
        class="m-0" />
      <div class="ml-auto">
        Total Articles
        <md-icon>remove</md-icon>
        <strong>{{ users.length }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  routeToMixin,
  tableSortMixin,
  MdIcon
} from 'vue-luma'
import CustomPager from '@/components/General/CustomPager'
import apiHandler from '@/api/apiHandler'

export default {
  components: {
    CustomPager,
    MdIcon
  },
  mixins: [
    routeToMixin,
    tableSortMixin
  ],
  data() {
    return {
      page: 1,
      per: 10
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/getAllUsers'
    }),
    fields() {
      return [{
        key: 'index',
        label: '#'
      }, {
        key: 'name',
        label: 'Name'
      }, {
        key: 'email',
        label: 'Email'
      }, {
        key: 'role',
        label: 'Role'
      }, {
        key: 'projectsCount',
        label: 'Projects Count'
      }, {
        key: 'createdAt',
        label: 'Created At'
      }, {
        key: 'status',
        label: 'Status'
      }, {
        key: 'actions',
        label: ''
      }]
    },
    paginatedItems() {
      const start = (this.page - 1) * this.per
      let items = this.users.slice(start, start + this.per)

      return items || []
    }
  },
  methods: {
    ...mapActions({
      toggleActiveUser: 'users/toggleActiveUser',
      getAllUsers: 'users/getAllUsers'
    }),
    toggleActive(user) {
      const data = {
        isActive: !user.isActive
      }
      const handler = this.$apiHandler
        .build()
        .setData({
          params: [user.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Toggled active user',
            'User status is successfully updated'
          )

          const handler = this.$apiHandler.build()
          this.getAllUsers(handler)
        })

      this.toggleActiveUser(handler)
    }
  }
}
</script>
