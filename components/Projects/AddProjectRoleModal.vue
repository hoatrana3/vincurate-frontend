<template>
  <b-modal ref="add-role-model" v-model="isOpen" hide-footer hide-header centered>
    <b-form-group
      label="User"
      label-for="user"
      label-class="form-label">
      <b-select
        v-model="userId"
        id="user"
        placeholder="Select user"
        :options="userOptions">
        <template #first>
          <b-form-select-option :value="null" disabled>Please select an user</b-form-select-option>
        </template>
      </b-select>
    </b-form-group>
    <b-form-group
      label="Role"
      label-for="role"
      class="mb-32pt"
      label-class="form-label">
      <b-select
        v-model="role"
        id="role"
        placeholder="Select role"
        :options="roleOptions">
        <template #first>
          <b-form-select-option :value="null" disabled>Please select a role</b-form-select-option>
        </template>
      </b-select>
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
  props: {
    onClose: {
      type: Function,
      default: () => {
      }
    },
    onSubmit: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      userId: null,
      role: 'Annotator'
    }
  },
  computed: {
    ...mapGetters({
      isOpenProjectRoleModal: 'projects/isOpenProjectRoleModal',
      allUsers: 'users/getAllUsers'
    }),
    userOptions() {
      return this.allUsers.map(user => ({
        text: user.name,
        value: user.id
      })).sort((o1, o2) => o1.text.localeCompare(o2.text))
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
      },
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
