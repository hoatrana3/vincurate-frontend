<template>
  <div :class="navbarContentContainerClass">
    <!-- Brand -->
    <b-navbar-brand
      :to="routeTo(routes.home)"
      :class="navbarBrandClass">
      <fmv-avatar
        :title="true"
        title-class="bg-primary"
        size="sm"
        no-link
        class="navbar-brand-icon mr-0 mr-lg-8pt">
        <b-img
          :src="brandImage"
          class="img-fluid"
          width="40"
          :alt="navbarBrand" />
      </fmv-avatar>
      <span
        class="d-none d-lg-block"
        v-text="navbarBrand" />
    </b-navbar-brand>

    <template v-if="navbarFullSampleGuestMode">
      <b-navbar-nav
        class="d-none d-sm-flex flex justify-content-start ml-8pt">
        <b-nav-item
          :to="routeTo(routes.home)"
          exact>
          Home
        </b-nav-item>
        <b-nav-item
          :to="routeTo(routes.articlesExplore)"
          exact>
          Explore
        </b-nav-item>
        <b-nav-item-dropdown
          v-if="isLoggedIn"
          text="Manage"
          no-caret>
          <b-dropdown-item :to="routeTo(routes.myProjects)">My Projects</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.addProject)">Create Project</b-dropdown-item>
          <b-dd-divider />
          <b-dropdown-item :to="routeTo(routes.myArticles)">My Articles</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.myLabels)">My Labels</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.myCategories)">My Categories</b-dropdown-item>
          <fragment v-if="currentUser && currentUser.role === 'admin'">
            <b-dd-divider />
            <b-dropdown-item :to="routeTo(routes.adminManageUsers)">System users</b-dropdown-item>
          </fragment>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </template>

    <!-- Menu -->
    <b-navbar-nav class="flex-nowrap d-flex ml-auto">
      <template
        v-if="!isLoggedIn">
        <b-nav-item
          v-b-tooltip.hover.bottom="{ title: $t('Login') }"
          :to="routeTo(routes.login)">
          <md-icon>lock_open</md-icon>
        </b-nav-item>
        <li
          class="nav-item">
          <b-btn
            :to="routeTo(routes.signup)"
            :variant="ctaClass">
            Sign up
          </b-btn>
        </li>
      </template>
      <template v-else>
        <!-- User Dropdown -->
        <b-nav-item-dropdown
          v-b-tooltip.hover.bottom="{ title: 'Account' }"
          right>
          <template slot="button-content">
            <fmv-avatar
              :title="true"
              title-class="bg-primary"
              size="sm"
              circle
              no-link>
              <md-icon>account_box</md-icon>
            </fmv-avatar>
          </template>
          <b-dropdown-header
            tag="div"
            class="form-label">
            {{ currentUser.name }}
          </b-dropdown-header>
          <b-dropdown-item :to="routeTo(routes.editAccount)">
            Edit Account
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click.prevent="userLogout">
            <md-icon>lock</md-icon>
            Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <!-- // END User dropdown -->

      </template>

    </b-navbar-nav>
    <!-- // END Menu -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { NavbarFullContentSample } from 'vue-luma'

export default {
  name: 'NavbarContent',
  extends: NavbarFullContentSample,
  computed: {
    ...mapGetters({
      isLoggedIn: 'users/isLoggedIn',
      currentUser: 'users/getCurrentUser'
    })
  },
  methods: {
    userLogout() {
      this.$store.dispatch('users/logout')
    }
  }
}
</script>
