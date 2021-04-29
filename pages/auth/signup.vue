<template>
  <luma-signup-page
    :title="title"
    :brand="$store.state.brand"
    :auth-with-google="false"
    :on-submit-handler="onSubmitHandler"
    :logo="logo" />
</template>

<script>
import Page from '@/components/Page'
import { LumaSignupPage } from 'vue-luma'
import { mapActions } from 'vuex'
import logo from '~/static/images/logo.svg'

export default {
  components: {
    LumaSignupPage
  },
  extends: Page,
  layout: 'blank',
  data() {
    return {
      title: 'Sign Up'
    }
  },
  computed: {
    logo() {
      return logo
    }
  },
  methods: {
    ...mapActions({
      registerUser: 'users/registerUser'
    }),
    onSubmitHandler(form) {
      const { email, name, password, password_confirmation } = form
      if (password !== password_confirmation) {
        this.$notify.error(
          'Failed to register new account',
          'Password and confirmation must be the same!'
        )
        return
      }

      const data = { email, name, password }
      const handler = this.$apiHandler
        .build()
        .setData({ data })
        .addOnResponse(() => {
          this.$notify.success(
            'Account created!',
            'Welcome to VDSC, thanks for joining us!'
          )
        })

      this.registerUser(handler)
    }
  }
}
</script>
