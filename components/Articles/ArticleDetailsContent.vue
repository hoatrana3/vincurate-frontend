<template>
  <div>
    <div class="card stack stack--2">
      <ul class="nav card-header d-flex align-items-center">
        <div
          v-if="$helpers.isDocClassProject(article.project)"
          class="d-flex flex-wrap align-items-center">
          <span
            v-for="category in article.categories"
            :key="category.id"
            class="has-category mr-2">
            {{ category.value }}
          </span>
        </div>
        <li class="nav-item navbar-list__item ml-auto">
          <b-dd
            variant="flush"
            toggle-class="text-muted"
            no-caret
            right>

            <template v-slot:button-content>
              <md-icon class="icon-24pt">more_vert</md-icon>
            </template>

            <b-dd-item :to="`/user/articles/${article.id}/edit-basic`">Edit</b-dd-item>
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
    }
  }
}
</script>
