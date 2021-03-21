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
      <article-content-renderer
        :article="article"
        class="card-body" />
      <slot name="content-footer" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ArticleContentRenderer from '~/components/Articles/ArticleContentRenderer'

export default {
  components: { ArticleContentRenderer },
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
    },
    doOnUnitConceptRemoved(oldCu, newCu, index) {
      this.groupNoneConceptUnits(newCu, index)
      this.$emit('onArticleContentEdited', this.article)
    },
    groupNoneConceptUnits(newCu, index) {
      const unitBef = this.article.combinedUnits[index - 1]
      const unitAft = this.article.combinedUnits[index + 1]
      let unitsToGroup = []
      let indexToInsert = index
      let countToRemove = 1

      if (unitBef && unitBef.type === 'O') {
        unitsToGroup.push(unitBef)
        indexToInsert = index - 1
        countToRemove++
      }

      unitsToGroup.push(newCu)

      if (unitAft && unitAft.type === 'O') {
        unitsToGroup.push(unitAft)
        countToRemove++
      }

      const groupedUnit = this.$helpers.groupCombinedUnits(unitsToGroup)
      this.article.combinedUnits.splice(indexToInsert, countToRemove, groupedUnit)
    }
  }
}
</script>
