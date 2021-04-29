<template>
  <b-modal v-model="isOpen" hide-footer hide-header centered no-close-on-backdrop>
    <b-form-group
      label="User"
      label-for="user"
      label-class="form-label">
      <v-select
        id="user"
        v-model="userId"
        placeholder="Select user"
        :options="userOptions"
        :reduce="item => item.value"
        :clearable="false"
        class="custom-v-select" />
    </b-form-group>
    <b-form-group
      label="Role"
      label-for="role"
      class="mb-32pt"
      label-class="form-label">
      <v-select
        id="role"
        v-model="role"
        placeholder="Select role"
        :options="roleOptions"
        :clearable="false"
        class="custom-v-select" />
    </b-form-group>
    <div class="d-flex justify-content-end">
      <b-button class="mr-3" variant="outline-danger" @click="hideModal">Close</b-button>
      <b-button :disabled="!userId" variant="primary" @click="submit">Submit</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      userId: null,
      role: 'Annotator'
    }
  },
  computed: {
    ...mapGetters({
      isOpenProjectRoleModal: 'projects/isOpenProjectRoleModal',
      allUsers: 'users/getAllUsers',
      currentUser: 'users/getCurrentUser'
    }),
    userOptions() {
      const users = this.allUsers.filter(u => u.id !== this.currentUser.id)
      return users.map(user => ({
        label: user.name,
        value: user.id
      })).sort((o1, o2) => o1.label.localeCompare(o2.label))
    },
    roleOptions() {
      return ['Annotator', 'Approver', 'Project Admin']
    },
    isOpen: {
      get() {
        return this.isOpenProjectRoleModal
      },
      set(val) {
        this.setIsOpen(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setIsOpen: 'projects/setOpenAddProjectRoleModal'
    }),
    hideModal() {
      this.isOpen = false
      this.$emit('onClose')
    },
    submit() {
      const user = this.allUsers.find(u => u.id === this.userId)
      user.role = this.role
      this.userId = null
      this.isOpen = false
      this.$emit('onSubmit', user)
    }
  }
}
</script>
