<template>
  <fragment>
    <template
      v-if="sidebar.menu.guest && sidebar.menu.guest.length">
      <div class="sidebar-heading">Guest</div>
      <fmv-sidebar-menu
        :menu="sidebar.i18nMenu.guest"
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
