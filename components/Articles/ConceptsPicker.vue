<template>
  <div class="concepts-picker">
    <page-separator title="BioConcepts" />

    <b-form class="page-section pt-0">
      <b-form-group
        v-for="concept in shownConceptLabels"
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
  props: {
    conceptLabels: {
      type: Array,
      default: () => []
    }
  },
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
    shownConceptLabels() {
      if (this.conceptLabels && this.conceptLabels.length) return this.conceptLabels
      return this.allConceptLabels
    },
    allShownConceptLabelValues() {
      return this.shownConceptLabels.map(l => l.value)
    }
  },
  watch: {
    allConceptLabels() {
      this.selectedConcepts = this.allShownConceptLabelValues
    }
  },
  mounted() {
    this.selectedConcepts = this.allShownConceptLabelValues
  },
  methods: {
    ...mapMutations({
      setSelectedConcepts: 'articles/setSelectedConcepts'
    })
  }
}
</script>
