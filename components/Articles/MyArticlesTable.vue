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

      <template #cell(project)="{item: {project: {id, title}}}">
        <b-link :to="`/user/projects/${id}`">{{ title }}</b-link>
      </template>

      <template #cell(yourRole)="data">
        {{ $helpers.currentUserRoleInProject(data.item.project) }}
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

          <b-dd-item :to="`/user/articles/${data.item.id}`">Details</b-dd-item>
          <b-dd-item :to="`/user/articles/${data.item.id}/edit-basic`">Edit</b-dd-item>
          <b-dd-item :to="`/guest/articles/${data.item.id}`">Guest view</b-dd-item>
          <b-dd-item :to="`/user/projects/${data.item.project.id}/annotate/${data.item.id}`">Annotate</b-dd-item>
          <b-dd-divider />
          <b-dd-item variant="danger" @click="() => doDelete(data.item)">Delete</b-dd-item>
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
        key: 'project',
        label: 'Project'
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
      let items = this.articles.slice(start, start + this.per)

      return items || []
    }
  },
  created() {
    this.fetchUserArticles()
  },
  methods: {
    ...mapActions({
      getUserArticles: 'users/getUserArticles',
      deleteArticle: 'articles/deleteArticle'
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
    doDelete(article) {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [article.id] })
        .addOnResponse(() => {
          this.$notify.success(
            'Successfully delete article',
            'Your article is deleted'
          )

          const index = this.articles.findIndex(a => a.id === article.id)
          this.articles.splice(index, 1)
        })
      this.deleteArticle(handler)
    }
  }
}
</script>
