<template>
  <div>
    <div class="card stack stack--2">
      <ul class="nav card-header d-flex align-items-center">
        <li class="nav-item navbar-list__item mr-3">
          <md-icon
            left
            class="text-muted icon--left">
            person_pin
          </md-icon>
          Unkown author
        </li>
        <li class="nav-item navbar-list__item">
          <md-icon
            left
            class="text-muted">
            filter_list
          </md-icon>
          {{ article.category }}
        </li>
        <li class="nav-item navbar-list__item ml-auto">
          <b-btn
            v-b-tooltip.hover.bottom="'Download CSV'"
            variant="light"
            pill
            size="sm"
            @click.prevent="downloadArticle">
            <i class="material-icons text-black-70">file_download</i>
          </b-btn>
        </li>
      </ul>
      <div class="card-body">
        <unit-text
          v-for="(unit, index) in article.combinedUnits"
          :key="index"
          :unit="unit"
          :prepend="article.combinedUnits[index - 1]"
          :append="article.combinedUnits[index + 1]"
          :is-first="index === 0"
          :is-last="index === article.combinedUnits.length - 1" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UnitText from '@/components/Articles/UnitText'

export default {
  components: { UnitText },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      exportArticle: 'articles/exportArticle'
    }),
    downloadArticle() {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [this.article.id] })

      this.exportArticle(handler)
    }
  }
}
</script>
