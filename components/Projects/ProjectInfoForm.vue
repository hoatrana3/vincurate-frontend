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
        label="Type"
        label-for="type"
        class="mb-32pt"
        label-class="form-label">
        <b-select
          v-model="type"
          :disabled="!forNew"
          id="type"
          placeholder="Select project type"
          :options="['Sequence to Sequence', 'Sequence Labeling', 'Document Classification']">
          <template #first>
            <b-form-select-option :value="null" disabled>Please select a project type</b-form-select-option>
          </template>
        </b-select>
      </b-form-group>

      <page-separator title="Project Roles" />
      <my-project-roles-table
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
      </my-project-roles-table>
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

    <add-project-role-modal @onSubmit="addNewRole" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MyProjectRolesTable from '@/components/Projects/MyProjectRolesTable'
import AddProjectRoleModal from '@/components/Projects/AddProjectRoleModal'

export default {
  components: { AddProjectRoleModal, MyProjectRolesTable },
  props: {
    forNew: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      projectTitle: '',
      type: 'Sequence Labeling',
      roles: []
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
          this.type = val.type
          this.roles = this.currentProjectRoles
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setOpenAddProjectRoleModal: 'projects/setOpenAddProjectRoleModal'
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
    saveProject() {
      const data = {
        title: this.projectTitle,
        type: this.type,
        owner: this.currentUser.id,
        roles: this.roles.map(r => ({
          user: r.id,
          role: r.role
        }))
      }
      this.$emit('onSubmit', data)
    }
  }
}
</script>
