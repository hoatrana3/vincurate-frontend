<template>
  <div>
    <div class="card stack stack--2">
      <ul class="nav card-header d-flex align-items-center">
        <li class="nav-item navbar-list__item mr-3">
          <md-icon
            left
            class="text-muted icon--left">
            inbox
          </md-icon>
          {{ articleSource }}
        </li>
        <li class="nav-item navbar-list__item mr-3">
          <md-icon
            left
            class="text-muted">
            filter_list
          </md-icon>
          {{ article.category }}
        </li>
        <li class="nav-item navbar-list__item mr-3">
          <md-icon
            left
            class="text-muted icon--left">
            remove_red_eye
          </md-icon>
          {{ article.visibility }}
        </li>
        <li class="nav-item navbar-list__item ml-auto">
          <b-dd
            variant="flush"
            toggle-class="text-muted"
            no-caret
            right>

            <template v-slot:button-content>
              <md-icon class="icon-24pt">more_vert</md-icon>
            </template>

            <b-dd-item :to="`/articles/${article.id}/edit-basic`">Edit</b-dd-item>
            <b-dd-item @click.prevent="downloadArticle">Download data</b-dd-item>
            <b-dd-divider />
            <b-dd-item variant="danger">Delete</b-dd-item>
          </b-dd>
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
  computed: {
    articleSource() {
      const source = this.article.source
      return !source || !source.length ? 'Unknown source' : source
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
