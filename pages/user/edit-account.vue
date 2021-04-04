<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />

    <b-form
      class="col-sm-5 px-0 page-section pt-0"
      @submit.prevent="doSave">
      <b-form-group
        label="Full Name"
        label-for="full-name"
        label-class="form-label">
        <b-form-input
          id="full-name"
          v-model="profile.name"
          placeholder="Your full name" />
      </b-form-group>

      <b-form-group
        label="Your email address"
        description="Note that if you change your email, you will have to confirm it again."
        label-for="email"
        label-class="form-label">
        <fmv-input-group-merge
          id="email"
          v-model="profile.email"
          placeholder="Your email address"
          type="email"
          prepend>
          <md-icon>email</md-icon>
        </fmv-input-group-merge>
      </b-form-group>

      <b-btn
        type="submit"
        variant="primary">
        Save Changes
      </b-btn>
    </b-form>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters, mapActions } from 'vuex'
import {
  MdIcon,
  PageHeader,
  PageSeparator
} from 'vue-luma'
import Page from '@/components/Page'
import { FmvInputGroupMerge } from 'fmv-input-group-merge'

export default {
  components: {
    MdIcon,
    PageHeader,
    PageSeparator,
    FmvInputGroupMerge
  },
  extends: Page,
  layout: 'boxed',
  data() {
    return {
      title: 'Edit Profile',
      profile: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/getCurrentUser'
    })
  },
  created() {
    this.profile = cloneDeep(this.currentUser)
  },
  methods: {
    ...mapActions({
      updateUserInfo: 'users/updateUser'
    }),
    doSave() {
      const data = {
        name: this.profile.name,
        email: this.profile.email
      }
      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.profile.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated profile',
            'Your profile is successfully updated'
          )
          this.profile = response.getData()
        })

      this.updateUserInfo(handler)
    }
  }
}
</script>
