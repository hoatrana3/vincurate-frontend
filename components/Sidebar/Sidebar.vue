<template>
  <app-sidebar
    :sidebar-search="sidebarSearch"
    :sidebar-search-form-class="sidebarSearchFormClass"
    :sidebar-brand="sidebarBrand"
    :sidebar-brand-class="sidebarBrandClass"
    :sidebar-type="sidebarType"
    :sidebar-variant="sidebarVariant"
    :sidebar-menu="sidebarMenu"
    :brand-image="brandImage">
    <template v-slot:default="{sidebar}">
      <sidebar-content :sidebar="sidebar" />
    </template>
  </app-sidebar>
</template>

<script>
import { AppSidebar } from 'vue-luma'
import SidebarContent from '~/components/Sidebar/SidebarContent'
import logo from '~/static/images/logo.svg'

export default {
  components: { SidebarContent, AppSidebar },
  props: {
    sidebarType: {
      type: String,
      default: () => 'dark-pickled-bluewood'
    },
    sidebarVariant: {
      type: String,
      default: () => null
    },
    sidebarBrand: {
      type: [String, Boolean],
      default: () => 'Brand'
    },
    brandImage: {
      type: String,
      default: logo
    },
    sidebarBrandClass: {
      type: [Array, String, Object],
      default: null
    },
    sidebarSearch: {
      type: Boolean,
      default: true
    },
    sidebarSearchFormClass: {
      type: [Array, String, Object],
      default: () => null
    },
    sidebarMenu: {
      type: Object,
      default: () => null
    }
  },
}
</script>
