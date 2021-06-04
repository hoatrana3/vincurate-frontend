<template>
  <div>
    <div class="flex">
      <h1 class="h2 measure-lead-max mb-16pt" v-text="article.title" />
      <div class="d-flex align-items-center">
        <fmv-avatar
          :to="routeTo(routes.instructorProfile)"
          src="/images/fakeavatar.png"
          alt="author"
          size="sm"
          circle
          class="mr-12pt" />
        <div class="mr-16pt">
          <b-link
            :to="routeTo(routes.instructorProfile)"
            class="card-title"
            v-text="article.user.name" />
          <div class="d-flex align-items-center">
            <small
              class="text-50 mr-2">
              {{ $helpers.formatTimeAgo(article.createdAt) }}
            </small>
            <small
              class="text-50 mr-2"
              v-text="articleReadingTime" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FmvAvatar } from 'fmv-avatar'
import {
  routeToMixin
} from 'vue-luma'
import readingTime from 'reading-time'

export default {
  components: {
    FmvAvatar
  },
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
