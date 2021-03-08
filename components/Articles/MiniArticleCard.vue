<template>
  <div class="card card--elevated">
    <div class="card-body d-flex">
      <span class="icon-holder icon-holder--outline-muted rounded-circle d-inline-flex mr-16pt">
        <i class="material-icons">notes</i>
      </span>
      <div class="flex">
        <b-link
          class="card-title mb-8pt"
          :to="`/articles/${article.id}`">
          No Title Article
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
      <span class="text-muted"><small>{{ article.category }}</small></span>
    </div>
  </div>
</template>

<script>
import { routeToMixin } from 'vue-luma'

export default {
  name: 'MiniArticleCard',
  mixins: [routeToMixin],
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
