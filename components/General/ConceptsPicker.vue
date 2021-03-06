<template>
  <div class="concepts-picker">
    <page-separator :title="title" />

    <b-form class="page-section pt-0">
      <b-form-group
        v-for="[type, concept] of Object.entries($helpers.UNIT_CONCEPTS)"
        :key="type">
        <b-form-checkbox
          v-if="type !== 'O'"
          v-model="selectedConcepts"
          :value="type"
          :class="`concept-box-${type}`">
          <small
            :style="`color: ${getPickerTextColor(type, concept)}`"
            class="font-weight-medium">
            {{ concept.name }}
          </small>
        </b-form-checkbox>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: 'BioConcepts'
    }
  },
  computed: {
    ...mapGetters({
      getSelectedConcepts: 'articles/getSelectedConcepts'
    }),
    selectedConcepts: {
      get() {
        return this.getSelectedConcepts
      },
      set(val) {
        this.setSelectedConcepts(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setSelectedConcepts: 'articles/setSelectedConcepts'
    }),
    getPickerTextColor(type, concept) {
      return this.selectedConcepts.includes(type) ? concept.hex : '#6c6e7d'
    }
  }
}
</script>
