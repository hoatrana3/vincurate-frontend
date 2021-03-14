<template>
  <div class="concepts-picker">
    <page-separator title="BioConcepts" />

    <b-form class="page-section pt-0">
      <b-form-group
        v-for="concept in allConceptLabels"
        :key="concept.id">
        <b-form-checkbox
          v-model="selectedConcepts"
          :value="concept.value"
          :class="`has-concept-checkbox concept-${concept.value}`">
          <small
            class="checkbox-concept-text font-weight-medium">
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
  computed: {
    ...mapGetters({
      allConceptLabels: 'label/getAllLabels',
      getSelectedConcepts: 'articles/getSelectedConcepts'
    }),
    selectedConcepts: {
      get() {
        return this.getSelectedConcepts
      },
      set(val) {
        this.setSelectedConcepts(val)
      }
    },
    allConceptLabelValues() {
      return this.allConceptLabels.map(l => l.value)
    }
  },
  watch: {
    allConceptLabels() {
      this.selectedConcepts = this.allConceptLabelValues
    }
  },
  mounted() {
    this.selectedConcepts = this.allConceptLabelValues
  },
  methods: {
    ...mapMutations({
      setSelectedConcepts: 'articles/setSelectedConcepts'
    }),
  }
}
</script>
