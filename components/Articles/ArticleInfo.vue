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
            <b-link :to="`projects/${currentArticle.project.id}`">{{ currentArticle.project.title }}</b-link>
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
    </div>
    <div class="col-md-4">
      <b-btn
        block
        :to="`/articles/${currentArticle.id}/edit-basic`"
        variant="dark"
        class="mb-2">
        <md-icon v-text="'mode_edit'" class="mr-2" />
        Edit article
      </b-btn>

      <div class="d-flex align-items-center mb-4">
        <b-btn
          variant="primary"
          :to="`/articles/${currentArticle.id}/curate-data`"
          class="flex mr-2">
          <md-icon v-text="'ballot'" class="mr-2" />
          Curate
        </b-btn>
        <b-btn
          variant="info"
          :to="`/articles/${currentArticle.id}`"
          class="flex">
          <md-icon v-text="'remove_red_eye'" class="mr-2" />
          Guest view
        </b-btn>
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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle'
    }),
    articleTitle() {
      const title = this.currentArticle.title
      return !title || !title.length ? 'No Title Article' : title
    }
  }
}
</script>
