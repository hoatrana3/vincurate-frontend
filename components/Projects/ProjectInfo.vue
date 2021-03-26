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
      <div class="d-flex justify-content-between align-item-center flex-wrap mb-32pt">
        <b-form-group
          label="Type"
          class="mr-3"
          label-class="form-label">
          <span class="text-black-70">
            {{ currentProject.type }}
          </span>
        </b-form-group>
        <b-form-group
          label="Created at"
          class="mr-3"
          label-class="form-label">
          <span class="text-black-70">
            {{ $helpers.formatTimeAgo(currentProject.createdAt) }}
          </span>
        </b-form-group>
        <b-form-group
          label="Last updated"
          label-class="form-label">
          <span class="text-black-70">
            {{ $helpers.formatTimeAgo(currentProject.updatedAt) }}
          </span>
        </b-form-group>
      </div>

      <page-separator title="Roles" />
      <project-roles-table
        :roles="projectRoles"
        class="mb-32pt"
        no-actions />

      <page-separator title="Labels" />
      <project-labels-table
        :labels="currentProject.labels"
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
        variant="primary"
        :to="`/projects/${currentProject.id}/upload-articles`"
        class="mb-4">
        <md-icon v-text="'file_upload'" class="mr-2" />
        Upload
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

    <div class="col-12">
      <page-separator title="Project Articles" />
      <articles-explore :additional-query="currentProject.id" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectRolesTable from '@/components/Projects/ProjectRolesTable'
import ArticlesExplore from '@/components/Articles/ArticlesExplore'
import ProjectLabelsTable from '@/components/Projects/ProjectLabelsTable'

export default {
  components: { ProjectLabelsTable, ArticlesExplore, ProjectRolesTable },
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
  }
}
</script>
