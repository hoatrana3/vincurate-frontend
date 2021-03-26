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

      <template #cell(articlesCount)="data">
        {{ data.item.articles.length }}
      </template>

      <template #cell(createdAt)="data">
        {{ formatDate(data) }}
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

          <b-dd-item :to="`/projects/${data.item.id}`">Details</b-dd-item>
          <b-dd-item :to="`/projects/${data.item.id}/edit`">Edit</b-dd-item>
          <b-dd-item :to="`/projects/${data.item.id}/upload-articles`">Upload</b-dd-item>
          <b-dd-divider />
          <b-dd-item variant="danger">Delete</b-dd-item>
        </b-dd>
      </template>

    </b-table>

    <div class="card-footer d-flex align-items-center">
      <custom-pager
        v-model="page"
        :rows="projects.length"
        :per-page="per"
        class="m-0" />
      <div class="ml-auto">
        Total Articles
        <md-icon>remove</md-icon>
        <strong>{{ projects.length }}</strong>
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
      projects: [],
      page: 1,
      per: 10
    }
  },
  computed: {
    ...mapGetters({
      userId: 'users/getCurrentUserId'
    }),
    fields() {
      return [{
        key: 'index',
        label: '#'
      }, {
        key: 'title',
        label: 'Title',
        thClass: 'text-right',
        tdClass: 'text-right'
      }, {
        key: 'type',
        label: 'Type',
        thClass: 'text-right',
        tdClass: 'text-right'
      }, {
        key: 'articlesCount',
        label: 'Articles Count',
      }, {
        key: 'createdAt',
        label: 'Created At'
      }, {
        key: 'actions',
        label: ''
      }]
    },
    paginatedItems() {
      const start = (this.page - 1) * this.per
      let items = this.projects.slice(start, start + this.per)

      return items || []
    }
  },
  created() {
    this.fetchUserProjects()
  },
  methods: {
    ...mapActions({
      getUserProjects: 'users/getUserProjects'
    }),
    async fetchUserProjects() {
      const userId = this.userId
      const handler = this.$apiHandler
        .build()
        .setData({ params: [userId] })
        .addOnResponse((response) => {
          this.projects = response.getData()
        })
      await this.getUserProjects(handler)
    },
    formatDate(date) {
      return this.$moment(date.value).format('DD-MM-YYYY HH:mm:ss')
    }
  }
}
</script>
