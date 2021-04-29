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

      <template #cell(types)="data">
        {{ data.item.types.join(', ') }}
      </template>

      <template #cell(articlesCount)="data">
        {{ data.item.articles.length }}
      </template>

      <template #cell(yourRole)="data">
        {{ $helpers.currentUserRoleInProject(data.item) }}
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

          <b-dd-item :to="`/user/projects/${data.item.id}`">Details</b-dd-item>
          <b-dd-item :to="`/user/projects/${data.item.id}/edit`">Edit</b-dd-item>
          <b-dd-item :to="`/user/projects/${data.item.id}/upload-articles`">Upload</b-dd-item>
          <b-dd-item
            v-if="data.item.articles.length > 0"
            :to="`/user/projects/${data.item.id}/annotate`">
            Annotate
          </b-dd-item>
          <b-dd-divider />
          <b-dd-item variant="danger" @click="() => doDelete(data.item)">Delete</b-dd-item>
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
        Total Projects
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
        key: 'types',
        label: 'Types',
        thClass: 'text-right',
        tdClass: 'text-right'
      }, {
        key: 'articlesCount',
        label: 'Articles Count'
      }, {
        key: 'yourRole',
        label: 'Your Role'
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
      getUserProjects: 'users/getUserProjects',
      deleteProject: 'projects/deleteProject'
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
    doDelete(project) {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [project.id] })
        .addOnResponse(() => {
          this.$notify.success(
            'Successfully delete project',
            'Your project is deleted'
          )

          const index = this.projects.findIndex(a => a.id === project.id)
          this.projects.splice(index, 1)
        })
      this.deleteProject(handler)
    }
  }
}
</script>
