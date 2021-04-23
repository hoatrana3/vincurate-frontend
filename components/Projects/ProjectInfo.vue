<template>
  <div class="row">
    <div class="col-md-8">
      <page-separator title="Basic information" />
      <b-form-group
        label="Project title"
        label-class="form-label">
        <h2 class="text-primary text-capitalize font-weight-bold">
          {{ currentProject.title }}
        </h2>
      </b-form-group>
      <b-form-group
        label="Project types"
        label-class="form-label">
        <span class="text-black-70">
          {{ currentProject.types.join(', ') }}
        </span>
      </b-form-group>
      <div class="row mb-32pt">
        <div class="col-md-6">
          <b-form-group
            label="Created at"
            class="mr-5"
            label-class="form-label">
            <span class="text-black-70">
              {{ $helpers.formatTimeAgo(currentProject.createdAt) }}
            </span>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
            label="Last updated"
            label-class="form-label">
            <span class="text-black-70">
              {{ $helpers.formatTimeAgo(currentProject.updatedAt) }}
            </span>
          </b-form-group>
        </div>
      </div>

      <page-separator title="Roles" />
      <project-roles-table
        :roles="projectRoles"
        class="mb-32pt"
        no-actions />
    </div>
    <div class="col-md-4">
      <b-btn
        block
        :to="`/projects/${currentProject.id}/edit`"
        variant="dark">
        <md-icon v-text="'mode_edit'" class="mr-2" />
        Edit project
      </b-btn>
      <b-btn
        block
        :to="`/projects/${currentProject.id}/annotate`"
        :disabled="currentProject.articles.length <= 0"
        variant="primary"
        class="mb-2">
        <md-icon v-text="'art_track'" class="mr-2" />
        Perform annotate
      </b-btn>

      <div class="d-flex align-items-center mb-2">
        <b-btn
          variant="warning"
          :to="`/projects/${currentProject.id}/upload-articles`"
          class="flex mr-2">
          <md-icon v-text="'file_upload'" class="mr-2" />
          Upload
        </b-btn>
        <b-btn
          variant="light"
          :to="`/projects/${currentProject.id}/new-article`"
          class="flex">
          <md-icon v-text="'add'" class="mr-2" />
          Create
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

      <page-separator title="Owner" />
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
            v-text="currentProject.owner.name" />
          <p
            class="card-subtitle text-black-70"
            v-text="currentProject.owner.email" />
        </div>
      </div>
    </div>

    <div :class="`${currentProject.types.length > 1 ? 'col-12' : 'col-md-8'}`">
      <div class="row">
        <div
          v-if="$helpers.isSeqLabelProject(currentProject)"
          class="col">
          <page-separator title="Labels" />
          <project-labels-table
            :labels="currentProject.labels"
            class="mb-32pt"
            no-actions />
        </div>
        <div
          v-if="$helpers.isDocClassProject(currentProject)"
          class="col">
          <page-separator title="Categories" />
          <project-categories-table
            :categories="currentProject.categories"
            class="mb-32pt"
            no-actions />
        </div>
      </div>
    </div>

    <div class="col-12">
      <page-separator title="Project Articles" />
      <articles-explore
        :project="currentProject"
        :additional-query="currentProject.id" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectRolesTable from '@/components/Projects/ProjectRolesTable'
import ArticlesExplore from '@/components/Articles/ArticlesExplore'
import ProjectLabelsTable from '@/components/Projects/ProjectLabelsTable'
import ProjectCategoriesTable from '@/components/Projects/ProjectCategoriesTable'

export default {
  components: { ProjectCategoriesTable, ProjectLabelsTable, ArticlesExplore, ProjectRolesTable },
  computed: {
    ...mapGetters({
      currentProject: 'projects/getCurrentProject'
    }),
    projectRoles() {
      return this.currentProject.roles.map(r => ({
        ...r.user,
        role: r.role
      }))
    }
  },
  methods: {
    ...mapActions({
      deleteProject: 'projects/deleteProject'
    }),
    doDelete() {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [this.currentProject.id] })
        .addOnResponse(() => {
          this.$notify.success(
            'Successfully delete project',
            'Your project is deleted'
          )

          this.$router.push('/projects/my-projects')
        })
      this.deleteProject(handler)
    }
  }
}
</script>
