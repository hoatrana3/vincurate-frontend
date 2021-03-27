<template>
  <div>
    <template
      v-if="sidebar.menu.general && sidebar.menu.general.length">
      <div class="sidebar-heading">General</div>
      <fmv-sidebar-menu
        :menu="sidebar.i18nMenu.general"
        class="mb-24pt" />
    </template>
    <template
      v-if="sidebar.menu.projects && sidebar.menu.projects.length">
      <div class="sidebar-heading">Projects</div>
      <fmv-sidebar-menu
        :menu="sidebar.i18nMenu.projects"
        class="mb-24pt" />
    </template>
    <template
      v-if="sidebar.menu.articles && sidebar.menu.articles.length">
      <div class="sidebar-heading">Articles</div>
      <fmv-sidebar-menu
        :menu="sidebar.i18nMenu.articles"
        class="mb-24pt" />
    </template>
    <template
      v-if="currentUser && currentUser.role === 'admin' && sidebar.menu.admin && sidebar.menu.admin.length">
      <div class="sidebar-heading">Admin</div>
      <fmv-sidebar-menu
        :menu="sidebar.i18nMenu.admin"
        class="mb-24pt" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    sidebar: {
      type: Object,
      required: true
    }
  },
  computed: mapGetters({
    currentUser: 'users/getCurrentUser'
  })
}
</script>
