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

      <template #cell(title)="data">
        {{ !data.length ? 'No Article Title' : data }}
      </template>

      <template #cell(description)="data">
        <div v-html="data.item.description" />
      </template>

      <template #cell(annotationsCount)="data">
        {{ data.item.annotations.length }}
      </template>

      <template #cell(createdAt)="data">
        {{ formatDate(data) }}
      </template>

      <template #cell(updatedAt)="data">
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

          <b-dd-item :to="`/articles/${data.item.id}`">Details</b-dd-item>
          <b-dd-item :to="`/articles/${data.item.id}/edit-basic`">Edit basic</b-dd-item>
          <b-dd-item :to="`/articles/${data.item.id}/edit-data`">Edit data</b-dd-item>
          <b-dd-divider />
          <b-dd-item variant="danger">Delete</b-dd-item>
        </b-dd>
      </template>

    </b-table>

    <div class="card-footer d-flex align-items-center">
      <custom-pager
        v-model="page"
        :rows="articles.length"
        :per-page="per"
        class="m-0" />
      <div class="ml-auto">
        Total Articles
        <md-icon>remove</md-icon>
        <strong>{{ articles.length }}</strong>
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
      articles: [],
      page: 1,
      per: 10
    }
  },
  computed: {
    ...mapGetters({
      userId: 'users/getCurrentUserId'
    }),
    sortBy() {
      return this.earnings ? 'revenue' : 'purchased_at'
    },
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
        key: 'description',
        label: 'Description',
        thClass: 'text-right',
        tdClass: 'text-right'
      }, {
        key: 'annotationsCount',
        label: 'Annotations Count',
        sortable: true
      }, {
        key: 'createdAt',
        sortable: true,
        label: 'Created At'
      }, {
        key: 'updatedAt',
        sortable: true,
        label: 'Last Updated'
      }, {
        key: 'actions',
        label: ''
      }]
    },
    paginatedItems() {
      const start = (this.page - 1) * this.per
      let items = this.articles.slice(start, start + this.per)

      return items || []
    }
  },
  created() {
    this.fetchUserArticles()
  },
  methods: {
    ...mapActions({
      getUserArticles: 'users/getUserArticles'
    }),
    async fetchUserArticles() {
      const userId = this.userId
      const handler = this.$apiHandler
        .build()
        .setData({ params: [userId] })
        .addOnResponse((response) => {
          this.articles = response.getData()
        })
      await this.getUserArticles(handler)
    },
    formatDate(date) {
      return this.$helpers.formatTimeAgo(date)
    }
  }
}
</script>
