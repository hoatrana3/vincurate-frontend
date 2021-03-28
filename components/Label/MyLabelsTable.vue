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
        <span :class="$helpers.getLabelPreviewClass(data.item)">Example {{ data.item.type }}</span>
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

          <b-dd-item :to="`/labels/${data.item.id}/edit`">Edit</b-dd-item>
<!--          <b-dd-divider />-->
<!--          <b-dd-item variant="danger" @click="() => doDelete(data.item)">Delete</b-dd-item>-->
        </b-dd>
      </template>
    </b-table>

    <div class="card-footer d-flex align-items-center">
      <custom-pager
        v-model="page"
        :rows="labels.length"
        :per-page="per"
        class="m-0" />
      <div class="ml-auto">
        Total Labels
        <md-icon>remove</md-icon>
        <strong>{{ labels.length }}</strong>
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
      labels: [],
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
        key: 'name',
        label: 'Name'
      }, {
        key: 'value',
        label: 'Code'
      }, {
        key: 'type',
        label: 'Type'
      }, {
        key: 'color',
        label: 'Color'
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
      let items = this.labels.slice(start, start + this.per)

      return items || []
    }
  },
  created() {
    this.fetchUserLabels()
  },
  methods: {
    ...mapActions({
      getUserLabels: 'users/getUserLabels',
      deleteLabel: 'labels/deleteLabel'
    }),
    async fetchUserLabels() {
      const userId = this.userId
      const handler = this.$apiHandler
        .build()
        .setData({ params: [userId] })
        .addOnResponse((response) => {
          this.labels = response.getData()
        })
      await this.getUserLabels(handler)
    },
    doDelete(label) {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [label.id] })
        .addOnResponse(() => {
          this.$notify.success(
            'Successfully delete label',
            'Your label is deleted'
          )

          const index = this.labels.findIndex(a => a.id === label.id)
          this.labels.splice(index, 1)
        })
      this.deleteLabel(handler)
    }
  }
}
</script>
