<template>
  <fragment>
    <template
      v-if="sidebar.menu.general && sidebar.menu.general.length">
      <div class="sidebar-heading">General</div>
      <fmv-sidebar-menu
        :menu="sidebar.i18nMenu.general"
        class="mb-24pt" />
    </template>
    <template
      v-if="sidebar.menu.articles && sidebar.menu.articles.length">
      <div class="sidebar-heading">Articles</div>
      <fmv-sidebar-menu
        :menu="sidebar.i18nMenu.articles"
        class="mb-24pt" />
    </template>
  </fragment>
</template>

<script>
export default {
  props: {
    sidebar: {
      type: Object,
      required: true
    }
  }
}
</script>
