<template>
  <app-layout
    :body-class="bodyClass"
    :drawer-layout-class="drawerLayoutClass"
    :container-class="containerClass"
    :drawer-align="mainDrawerAlign"
    :sub-layout="subLayout"
    :sub-layout-has-scrolling-region="subLayoutHasScrollingRegion"
    :sub-layout-drawer="subLayoutDrawer"
    :sub-layout-drawer-id="subLayoutDrawerId"
    :sub-layout-drawer-align="subLayoutDrawerAlign"
    :navbar-type="navbarType"
    :navbar-variant="navbarVariant"
    :navbar-container-class="navbarContainerClass"
    :navbar-brand="$store.state.brand"
    navbar-brand-class="d-lg-none"
    navbar-toggle-class="d-lg-none"
    :navbar-full-sample-guest-mode="guest"
    :footer-brand="$store.state.brand">

    <!-- Replace Navbar Component -->
    <!-- <template v-slot:navbar>
      Replace Navbar Component
    </template> -->

    <!-- Replace Navbar Content -->
    <template v-slot:navbar-content>
      <navbar-content
        :navbar-type="navbarType"
        :navbar-brand="$store.state.brand"
        navbar-guest-mode
        navbar-brand-class="d-lg-none"
        navbar-toggle-class="d-lg-none"
        :navbar-content-container-class="navbarContainerClass" />
    </template>
    <!-- Replace Sidebar Component -->
    <template v-slot:sidebar>
      <sidebar
        :sidebar-search="sidebarSearch"
        sidebar-search-form-class="search-form--black"
        :sidebar-brand="$store.state.brand"
        :sidebar-brand-class="sidebarBrandClass"
        :sidebar-type="sidebarType"
        :sidebar-variant="sidebarVariant"
        :sidebar-menu="sidebarMenu" />
    </template>

    <!-- Replace Sidebar Content -->
    <!--    <template v-slot:sidebar-content="{sidebar}">-->
    <!--      <sidebar-content :sidebar="sidebar" />-->
    <!--    </template>-->

    <!-- Page Content -->
    <nuxt />

    <!-- Footer Content -->
    <!-- <template v-slot:footer-content="footerProps">
      <p class="text-70 brand mb-24pt">
        <img
          class="brand-icon"
          :src="footerProps.footerLogo"
          width="30"
          :alt="footerProps.footerBrand">
        {{ footerProps.footerBrand }}
      </p>

      <p class="text-50 measure-lead-max small">A beautifully crafted user interface for modern Education Platforms, including Courses & Tutorials, Video Lessons, Student and Teacher Dashboard, Curriculum Management, Earnings and Reporting, ERP, HR, CMS, Tasks, Projects, eCommerce and more.</p>

      <pre v-text="footerProps" />
    </template> -->

    <!-- Footer Links -->
    <!-- <template v-slot:footer-links>
      <p class="mb-8pt d-flex">
        <a class="text-70 text-underline mr-8pt small">Terms</a>
        <a class="text-70 text-underline small">Privacy</a>
      </p>
    </template> -->

    <!-- Footer Copyright Text -->
    <!-- <template v-slot:footer-copyright-text>
      Copyright 2020 &copy; All rights reserved!
    </template> -->

    <!-- Footer Description Text -->
    <!-- <template v-slot:footer-description-text>
      Hello World!
    </template> -->

    <!-- Replace Footer Component -->
    <!-- <template v-slot:footer>
      Replace Footer Component
    </template> -->

    <!-- App Settings -->
    <template v-slot:after-layout>
      <client-only>
        <app-settings
          v-if="$store.state.settings.ui && $route.params.layout" />
      </client-only>
    </template>
  </app-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppLayout } from 'vue-luma'
import AppSettings from '~/components/Settings'

import mainDrawerMixin from '~/mixins/main-drawer'
import navbarConfigMixin from '~/mixins/navbar-config'
import sidebarConfigMixin from '~/mixins/sidebar-config'
import layoutConfigMixin from '~/mixins/layout-config'
import subLayoutMixin from '~/mixins/sub-layout'

import NavbarContent from '@/components/Navbar/NavbarContent'
import Sidebar from '~/components/Sidebar/Sidebar'

export default {
  components: {
    Sidebar,
    AppLayout,
    AppSettings,
    NavbarContent
  },
  mixins: [
    mainDrawerMixin,
    navbarConfigMixin,
    sidebarConfigMixin,
    layoutConfigMixin,
    subLayoutMixin
  ],
  data() {
    return {
      guest: false
    }
  },
  computed: {
    ...mapGetters({
      sidebarMenu: 'sidebarMenuConfig/layoutMenu'
    }),
    bodyClass() {
      return null
    },
    sidebarSearch() {
      return true
    },
    sidebarBrandClass() {
      return null
    },
    drawerLayoutClass() {
      return null
    },
    sidebarConfigKey() {
      return this.mainDrawerSidebar
    },
  },
  created() {
    this.$root.$on('luma::guest', guest => this.guest = guest)
  }
}
</script>
