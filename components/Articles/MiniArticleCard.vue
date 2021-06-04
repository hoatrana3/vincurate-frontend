<template>
  <div class="card card--elevated">
    <div class="card-body d-flex">
      <span class="icon-holder icon-holder--outline-muted rounded-circle d-inline-flex mr-16pt">
        <i class="material-icons">notes</i>
      </span>
      <div class="flex">
        <b-link
          class="card-title mb-8pt"
          :to="`/guest/articles/${article.id}`">
          {{ article.title }}
        </b-link>
        <p class="text-70 mb-0" v-html="article.description" />
      </div>
    </div>
    <div class="card-footer d-flex lh-1 px-16pt py-8pt">
      <div class="flex text-muted">
        <small>By</small>
        <b-link
          class="small"
          :to="routeTo(routes.faq)">
          {{ article.user.name }}
        </b-link>
        <small>- {{ $helpers.formatTimeAgo(article.createdAt) }}</small>
      </div>
      <span class="text-muted"><small v-text="articleReadingTime" /></span>
    </div>
  </div>
</template>

<script>
import { routeToMixin } from 'vue-luma'
import readingTime from 'reading-time'

export default {
  name: 'MiniArticleCard',
  mixins: [routeToMixin],
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleReadingTime() {
      return readingTime(this.article.content).text
    }
  }
}
</script>
