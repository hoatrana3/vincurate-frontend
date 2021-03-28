<template>
  <div class="row">
    <div class="col-md-8">
      <page-separator title="Basic information" />
      <b-form-group
        label="Article title"
        label-class="form-label">
        <h2 class="text-primary text-capitalize font-weight-bold">
          {{ articleTitle }}
        </h2>
      </b-form-group>
      <div class="d-flex justify-content-between align-item-center flex-wrap mb-32pt">
        <b-form-group
          label="Project"
          class="mr-3"
          label-class="form-label">
          <span class="text-black-70">
            <b-link :to="`/projects/${currentArticle.project.id}`">{{ currentArticle.project.title }}</b-link>
          </span>
        </b-form-group>
        <b-form-group
          label="Created at"
          class="mr-3"
          label-class="form-label">
          <span class="text-black-70">
            {{ $helpers.formatTimeAgo(currentArticle.createdAt) }}
          </span>
        </b-form-group>
        <b-form-group
          label="Last updated"
          label-class="form-label">
          <span class="text-black-70">
            {{ $helpers.formatTimeAgo(currentArticle.updatedAt) }}
          </span>
        </b-form-group>
      </div>

      <page-separator title="Edit versions" />
      <article-edit-verions-table
        :edit-versions="currentArticle.editVersions"
        class="mb-32pt" />
    </div>
    <div class="col-md-4">
      <b-btn
        block
        :to="`/articles/${currentArticle.id}/edit-basic`"
        variant="dark">
        <md-icon v-text="'mode_edit'" class="mr-2" />
        Edit article
      </b-btn>
      <b-btn
        block
        variant="primary"
        :to="`/articles/${currentArticle.id}/curate-data`"
        class="mb-2">
        <md-icon v-text="'ballot'" class="mr-2" />
        Curate
      </b-btn>

      <div class="d-flex align-items-center mb-2">
        <b-dropdown
          variant="info"
          class="flex mr-2">
          <template #button-content>
            <md-icon v-text="'file_download'" class="mr-2" />
            Download
          </template>
          <b-dropdown-item @click="() => downloadArticle('SL_JSONL')">JSONL format</b-dropdown-item>
        </b-dropdown>
        <b-btn
          variant="light"
          :to="`/articles/${currentArticle.id}`"
          class="flex">
          <md-icon v-text="'remove_red_eye'" class="mr-2" />
          Guest view
        </b-btn>
      </div>

      <b-btn
        block
        variant="accent"
        class="mb-4"
        @click="doDelete">
        <md-icon v-text="'delete'" class="mr-2" />
        Delete
      </b-btn>

      <page-separator title="Uploaded by" />
      <div class="card">
        <div class="card-body flex text-center d-flex flex-column align-items-center justify-content-center">
          <fmv-avatar
            size="xl"
            class="overlay overlay--primary rounded-circle p-relative o-hidden mb-16pt overlay--show"
            src="/images/people/110/guy-3.jpg"
            alt="Owner avatar"
            circle>
            <template v-slot:after-img>
              <span class="overlay__content">
                <md-icon class="overlay__action icon-40pt">face</md-icon>
              </span>
            </template>
          </fmv-avatar>
          <b-link
            class="card-title flex"
            v-text="currentArticle.user.name" />
          <p
            class="card-subtitle text-black-70"
            v-text="currentArticle.user.email" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ArticleEditVerionsTable from '@/components/Articles/ArticleEditVerionsTable'

export default {
  components: { ArticleEditVerionsTable },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle'
    }),
    articleTitle() {
      const title = this.currentArticle.title
      return !title || !title.length ? 'No Title Article' : title
    }
  },
  methods: {
    ...mapActions({
      exportArticle: 'articles/exportArticle',
      deleteArticle: 'articles/deleteArticle'
    }),
    downloadArticle(method) {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [this.currentArticle.id], query: `method=${method}` })

      this.exportArticle(handler)
    },
    doDelete() {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [this.currentArticle.id] })
        .addOnResponse(() => {
          this.$notify.success(
            'Successfully delete article',
            'Your article is deleted'
          )

          this.$router.push('/articles/my-articles')
        })
      this.deleteArticle(handler)
    }
  }
}
</script>
