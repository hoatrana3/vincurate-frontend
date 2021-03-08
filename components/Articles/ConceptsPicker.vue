<template>
  <div class="concepts-picker">
    <page-separator title="BioConcepts" />

    <b-form class="page-section pt-0">
      <b-form-group
        v-for="[type, concept] of Object.entries($helpers.UNIT_CONCEPTS)"
        :key="type">
        <b-form-checkbox
          v-if="type !== 'O'"
          v-model="currentConcepts"
          :value="type"
          :class="`concept-box-${type}`"
          @change="onConceptsChanged">
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
  data() {
    return {
      currentConcepts: []
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
        this.currentConcepts = val
        this.setSelectedConcepts(val)
      }
    }
  },
  mounted() {
    this.currentConcepts = this.selectedConcepts
  },
  methods: {
    ...mapMutations({
      setSelectedConcepts: 'articles/setSelectedConcepts'
    }),
    getPickerTextColor(type, concept) {
      return this.selectedConcepts.includes(type) ? concept.hex : '#6c6e7d'
    },
    onConceptsChanged(value) {
      this.selectedConcepts = value
    }
  }
}
</script>
