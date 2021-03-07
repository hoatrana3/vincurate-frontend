<template>
  <b-navbar
    id="default-navbar"
    :class="navbarClass"
    :type="navbarType"
    :variant="navbarVariant">
    <div :class="navbarContainerClass">

      <!-- Toggle sidebar -->
      <button
        v-if="navbarShowToggle"
        v-fmv-toggle.default-drawer
        class="navbar-toggler w-auto mr-16pt d-block rounded-0"
        :class="navbarToggleClass"
        type="button">
        <md-icon>short_text</md-icon>
      </button>

      <slot>
        <navbar-content
          :navbar-type="navbarType"
          :navbar-brand="$store.state.brand"
          :navbar-search="navbarSearch"
          :navbar-full-sample-guest-mode="navbarFullSampleGuestMode"
          :navbar-content-container-class="navbarContentContainerClass || navbarContainerClass" />
      </slot>

    </div>
  </b-navbar>
</template>

<script>
import { AppNavbar } from 'vue-luma'
import NavbarContent from '@/components/Navbar/NavbarContent'

export default {
  components: { NavbarContent },
  extends: AppNavbar,
  props: {
    navbarShowToggle: {
      type: Boolean,
      default: true
    }
  }
}
</script>
