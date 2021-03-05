<template>
  <luma-login-page
    :title="title"
    :brand="$store.state.brand"
    :auth-with-google="false"
    :on-submit-handler="onSubmitHandler" />
</template>

<script>
import { mapActions } from 'vuex'
import Page from '~/components/Page'
import { LumaLoginPage } from 'vue-luma'

export default {
  components: {
    LumaLoginPage
  },
  extends: Page,
  layout: 'blank',
  data() {
    return {
      title: 'Login'
    }
  },
  async asyncData() {
    return {
      title: 'Login'
    }
  },
  methods: {
    ...mapActions({
      authenticateUser: 'users/authenticateUser'
    }),
    onSubmitHandler(form) {
      const handler = this.$apiHandler
        .build()
        .setData({ data: form })
        .addOnResponse(() => {
          this.$notify.success(
            'Successfully logged in!',
            'Welcome back, hope you have a nice day!'
          )
        })

      this.authenticateUser(handler)
    }
  }
}
</script>
