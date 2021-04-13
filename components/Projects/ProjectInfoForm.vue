<template>
  <div class="row">
    <div class="col-md-8">
      <page-separator title="Basic information" />
      <b-form-group
        label="Project title"
        label-for="title"
        class="mb-32pt"
        label-class="form-label">
        <b-form-input
          v-model="projectTitle"
          id="title"
          placeholder="Enter project title"
          size="lg" />
      </b-form-group>
      <b-form-group
        label="Project types"
        label-for="project-types"
        class="mb-32pt"
        label-class="form-label">
        <v-select
          id="project-types"
          v-model="types"
          multiple
          placeholder="Select project types"
          :options="['Sequence Labeling', 'Document Classification', 'Sequence Translation']"
          class="custom-v-select" />
      </b-form-group>

      <page-separator title="Roles" />
      <project-roles-table
        :roles="roles"
        class="mb-32pt"
        @removeRole="removeRole">
        <template v-slot:table-left-header>
          <b-btn
            exact
            variant="accent"
            @click="() => setOpenAddProjectRoleModal(true)"
            v-text="'Add role'" />
        </template>
      </project-roles-table>
    </div>
    <div class="col-md-4">
      <b-btn
        block
        type="submit"
        variant="primary"
        class="mb-4"
        @click="saveProject">
        <md-icon v-text="'save'" class="mr-2" />
        Save project
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
            v-text="currentUser.name" />
          <p
            class="card-subtitle text-black-70"
            v-text="currentUser.email" />
        </div>
      </div>
    </div>

    <div :class="`${types.length > 1 ? 'col-12' : 'col-md-8'}`">
      <div class="row">
        <div
          v-if="$helpers.isSeqLabelProject({types})"
          class="col">
          <page-separator title="Labels" />
          <project-labels-table
            :labels="labels"
            class="mb-32pt"
            @removeLabel="removeLabel">
            <template v-slot:table-left-header>
              <b-btn
                exact
                variant="accent"
                @click="() => setOpenAddProjectLabelModal(true)"
                v-text="'Add label'" />
            </template>
          </project-labels-table>
        </div>
        <div
          v-if="$helpers.isDocClassProject({types})"
          class="col">
          <page-separator title="Categories" />
          <project-categories-table
            :categories="categories"
            class="mb-32pt"
            @removeCategory="removeCategory">
            <template v-slot:table-left-header>
              <b-btn
                exact
                variant="accent"
                @click="() => setOpenAddProjectCategoryModal(true)"
                v-text="'Add Category'" />
            </template>
          </project-categories-table>
        </div>
      </div>
    </div>


    <add-project-role-modal @onSubmit="addNewRole" />
    <add-project-label-modal @onSubmit="addNewLabels" />
    <add-project-category-modal @onSubmit="addNewCategories" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ProjectRolesTable from '@/components/Projects/ProjectRolesTable'
import AddProjectRoleModal from '@/components/Projects/AddProjectRoleModal'
import ProjectLabelsTable from '@/components/Projects/ProjectLabelsTable'
import AddProjectLabelModal from '@/components/Projects/AddProjectLabelModal'
import ProjectCategoriesTable from '@/components/Projects/ProjectCategoriesTable'
import AddProjectCategoryModal from '@/components/Projects/AddProjectCategoryModal'

export default {
  components: {
    AddProjectCategoryModal,
    ProjectCategoriesTable,
    AddProjectLabelModal,
    ProjectLabelsTable,
    AddProjectRoleModal,
    ProjectRolesTable
  },
  props: {
    forNew: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      projectTitle: '',
      types: [],
      roles: [],
      labels: [],
      categories: []
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/getCurrentUser',
      allUsers: 'users/getAllUsers',
      currentProject: 'projects/getCurrentProject'
    }),
    currentProjectRoles() {
      return this.currentProject.roles.map(r => ({
        ...r.user,
        role: r.role
      }))
    }
  },
  watch: {
    currentProject: {
      immediate: true,
      handler(val) {
        if (!this.forNew) {
          this.projectTitle = val.title
          this.roles = this.currentProjectRoles
          this.labels = this.currentProject.labels
          this.categories = this.currentProject.categories
          this.types = this.currentProject.types
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setOpenAddProjectRoleModal: 'projects/setOpenAddProjectRoleModal',
      setOpenAddProjectLabelModal: 'projects/setOpenAddProjectLabelModal',
      setOpenAddProjectCategoryModal: 'projects/setOpenAddProjectCategoryModal'
    }),
    addNewRole(newRole) {
      const role = this.roles.find(r => r.id === newRole.id)
      if (!role) this.roles.push(newRole)
      else role.role = newRole.role
    },
    removeRole(item) {
      const index = this.roles.findIndex(r => r.id === item.id)
      if (index >= 0) this.roles.splice(index, 1)
    },
    addNewLabels(newLabels) {
      this.labels.push(
        ...newLabels.filter(l => this.labels.findIndex(_l => _l.id === l.id) < 0)
      )
    },
    removeLabel(item) {
      const index = this.labels.findIndex(l => l.id === item.id)
      if (index >= 0) this.labels.splice(index, 1)
    },
    addNewCategories(newCategories) {
      this.categories.push(
        ...newCategories.filter(l => this.categories.findIndex(_l => _l.id === l.id) < 0)
      )
    },
    removeCategory(item) {
      console.log(item)
      const index = this.categories.findIndex(l => l.id === item.id)
      if (index >= 0) this.categories.splice(index, 1)
    },
    saveProject() {
      const data = {
        title: this.projectTitle,
        owner: this.currentUser.id,
        roles: this.roles.map(r => ({
          user: r.id,
          role: r.role
        })),
        labels: this.labels.map(l => l.id),
        categories: this.categories.map(l => l.id),
        types: this.types
      }
      this.$emit('onSubmit', data)
    }
  }
}
</script>
