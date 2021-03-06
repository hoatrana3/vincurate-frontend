<template>
  <div class="row">
    <div class="col-md-8">
      <page-separator title="Basic information" />
      <b-form-group
        label="Article title"
        label-class="form-label">
        <h2 class="text-primary text-capitalize font-weight-bold">
          {{ currentArticle.title }}
        </h2>
      </b-form-group>
      <div class="row mb-32pt">
        <div class="col-md-4">
          <b-form-group
            label="Project"
            class="mr-3"
            label-class="form-label">
            <span class="text-black-70">
              <b-link :to="`/user/projects/${currentArticle.project.id}`">{{ currentArticle.project.title }}</b-link>
            </span>
          </b-form-group>
        </div>
        <div class="col-md-4">
          <b-form-group
            label="Created at"
            class="mr-3"
            label-class="form-label">
            <span class="text-black-70">
              {{ $helpers.formatTimeAgo(currentArticle.createdAt) }}
            </span>
          </b-form-group>
        </div>
        <div class="col-md-4">
          <b-form-group
            label="Last updated"
            label-class="form-label">
            <span class="text-black-70">
              {{ $helpers.formatTimeAgo(currentArticle.updatedAt) }}
            </span>
          </b-form-group>
        </div>
      </div>

      <template v-if="$helpers.isSeqLabelProject(currentArticle.project)">
        <page-separator title="Labeling versions" />
        <article-seq-label-version-table
          :seq-label-versions="currentArticle.seqLabelVersions"
          class="mb-32pt" />
      </template>

      <template v-if="$helpers.isDocClassProject(currentArticle.project)">
        <page-separator title="Category versions" />
        <article-category-version-table
          :category-versions="currentArticle.categoryVersions"
          class="mb-32pt" />
      </template>

      <template v-if="$helpers.isSeqTransProject(currentArticle.project)">
        <page-separator title="Translation versions" />
        <article-translation-version-table
          :translation-versions="currentArticle.translationVersions"
          class="mb-32pt" />
      </template>
    </div>
    <div class="col-md-4">
      <div class="mb-4">
        <b-btn
          v-if="$helpers.isCurrentUserApprover(currentArticle.project) || $helpers.isCurrentUserProjectAdmin(currentArticle.project)"
          block
          :to="`/user/articles/${currentArticle.id}/edit-basic`"
          variant="dark">
          <md-icon v-text="'mode_edit'" class="mr-2" />
          Edit article
        </b-btn>
        <b-btn
          block
          :to="`/user/projects/${currentArticle.project.id}/annotate/${currentArticle.id}`"
          variant="primary"
          class="mb-2">
          <md-icon v-text="'art_track'" class="mr-2" />
          Annotate article
        </b-btn>
        <div class="d-flex align-items-center mb-2">
          <b-btn
            variant="warning"
            exact
            :to="`/guest/articles/${currentArticle.id}`"
            class="flex mr-2">
            <md-icon v-text="'remove_red_eye'" class="mr-2" />
            Guest view
          </b-btn>
          <b-dropdown
            variant="light"
            class="flex">
            <template #button-content>
              <md-icon v-text="'file_download'" class="mr-2" />
              Download
            </template>
            <b-dropdown-item @click="() => downloadArticle('FORMAT_JSONL')">JSONL format</b-dropdown-item>
          </b-dropdown>
        </div>
        <b-btn
          v-if="$helpers.isCurrentUserProjectAdmin(currentArticle.project)"
          block
          variant="accent"
          @click="doDelete">
          <md-icon v-text="'delete'" class="mr-2" />
          Delete
        </b-btn>
      </div>

      <page-separator title="Your Role" />
      <div class="card">
        <div class="card-body flex text-center d-flex flex-column align-items-center justify-content-center">
          <h3 class="text-accent">
            {{ $helpers.currentUserRoleInProject(currentArticle.project) }}
          </h3>
          <p class="card-subtitle text-black-70">
            {{ roleDescription }}
          </p>
        </div>
      </div>

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
import ArticleSeqLabelVersionTable from '@/components/Articles/ArticleSeqLabelVersionTable'
import ArticleCategoryVersionTable from '@/components/Articles/ArticleCategoryVersionTable'
import ArticleTranslationVersionTable from '@/components/Articles/ArticleTranslationVersionTable'

export default {
  components: { ArticleTranslationVersionTable, ArticleCategoryVersionTable, ArticleSeqLabelVersionTable },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle'
    }),
    roleDescription() {
      const roles = this.$helpers.PROJECT_ROLES
      switch (this.$helpers.currentUserRoleInProject(this.currentArticle.project)) {
        case roles.PROJECT_ADMIN:
          return 'You have fully permission to do everything to this article!'
        case roles.APPROVER:
          return 'You can directly update article data and review annotation versions in this article!'
        case roles.ANNOTATOR:
          return 'You can only annotate this article and create annotation versions!'
      }
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

          this.$router.push('/user/articles/my-articles')
        })
      this.deleteArticle(handler)
    }
  }
}
</script>
