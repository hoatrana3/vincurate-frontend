<template>
  <span
    :key="$moment().unix()"
    :style="`
    --concept-color: ${unitConcept.color}
    `"
    class="unit-text"
    :class="{
      'is-active': isActivated,
      'is-filtered': isFiltered,
      'is-editable': isEditable
    }"
    :unit-index="index"
    :unit-concept="unit.type"><!--
    -->{{ renderMessage
    }}<!--
  --><span @click="removeConcept"><!--
  --><md-icon
      v-if="isActivated && isEditable"
      class="btn-cancel-unit">cancel</md-icon><!--
  --></span><!--
  --></span>
</template>

<script>
import { mapGetters } from 'vuex'
import { MdIcon } from 'vue-luma'
import cloneDeep from 'lodash/cloneDeep'

export default {
  components: [MdIcon],
  props: {
    unit: {
      type: Object,
      default: () => {
      }
    },
    append: {
      type: Object,
      default: null
    },
    prepend: {
      type: Object,
      default: null
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    isLast: {
      type: Boolean,
      default: false
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      selectedConcepts: 'articles/getSelectedConcepts',
      pickedFilters: 'articles/getPickedFilters'
    }),
    renderMessage() {
      if (this.unit.type !== 'O') return this.unit.message

      return this.$helpers.getFormattedWordSpaces(
        this.unit.message,
        this.isFirst ? '' : this.prepend.message,
        this.isLast ? '' : this.append.message,
        this.isFirst,
        this.isLast
      )
    },
    unitConcept() {
      return this.$helpers.UNIT_CONCEPTS[this.unit.type]
    },
    isActivated() {
      return this.selectedConcepts.includes(this.unit.type)
    },
    isFiltered() {
      const index = this.pickedFilters.findIndex(
        (t) =>
          t.name.toLowerCase().trim() ===
          this.unit.message.toLowerCase().trim() &&
          t.type === this.unit.type
      )

      return index >= 0
    }
  },
  methods: {
    removeConcept() {
      const oldUnit = cloneDeep(this.unit)
      this.unit.type = 'O'
      this.$emit('onRemoveConcept', oldUnit, this.unit)
    }
  }
}
</script>
