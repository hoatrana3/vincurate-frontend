<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    size="xsm"
    hide-goto-end-buttons>
    <template v-slot:prev-text>
      <md-icon aria-hidden="true">chevron_left</md-icon>
      <span>Prev</span>
    </template>
    <template v-slot:next-text>
      <span>Next</span>
      <md-icon aria-hidden="true">chevron_right</md-icon>
    </template>
  </b-pagination>
</template>

<script>
import { MdIcon } from 'vue-luma'

export default {
  components: {
    MdIcon
  },
  props: {
    value: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 3
    },
    rows: {
      type: Number,
      default: 0
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  }
}
</script>
