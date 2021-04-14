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

      <template #cell(preview)="data">
        <span class="has-category">
          {{ data.item.value }}
        </span>
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

          <b-dd-item :to="`/categories/${data.item.id}/edit`">Edit</b-dd-item>
          <!--          <b-dd-divider />-->
          <!--          <b-dd-item variant="danger" @click="() => doDelete(data.item)">Delete</b-dd-item>-->
        </b-dd>
      </template>
    </b-table>

    <div class="card-footer d-flex align-items-center">
      <custom-pager
        v-model="page"
        :rows="categories.length"
        :per-page="per"
        class="m-0" />
      <div class="ml-auto">
        Total Categories
        <md-icon>remove</md-icon>
        <strong>{{ categories.length }}</strong>
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
      page: 1,
      per: 10
    }
  },
  computed: {
    ...mapGetters({
      userId: 'users/getCurrentUserId',
      categories: 'users/getUserCategories'
    }),
    fields() {
      return [{
        key: 'index',
        label: '#'
      }, {
        key: 'value',
        label: 'Value'
      }, {
        key: 'preview',
        label: 'Preview'
      }, {
        key: 'actions',
        label: ''
      }]
    },
    paginatedItems() {
      const start = (this.page - 1) * this.per
      let items = this.categories.slice(start, start + this.per)

      return items || []
    }
  },
  created() {
    this.fetchUserCategories()
  },
  methods: {
    ...mapActions({
      getUserCategories: 'users/getUserCategories',
      deleteCategory: 'categories/deleteCategory'
    }),
    async fetchUserCategories() {
      const userId = this.userId
      const handler = this.$apiHandler
        .build()
        .setData({ params: [userId] })
      await this.getUserCategories(handler)
    },
    doDelete(category) {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [category.id] })
        .addOnResponse(() => {
          this.$notify.success(
            'Successfully delete category',
            'Your category is deleted'
          )

          const index = this.categories.findIndex(a => a.id === category.id)
          this.categories.splice(index, 1)
        })
      this.deleteCategory(handler)
    }
  }
}
</script>
