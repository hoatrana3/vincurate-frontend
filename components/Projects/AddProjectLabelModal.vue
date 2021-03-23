<template>
  <b-modal ref="add-role-model" v-model="isOpen" hide-footer hide-header centered>
    <b-form-group
      label="Label"
      label-for="label"
      label-class="form-label">
      <b-select
        v-model="labelId"
        id="label"
        placeholder="Select label"
        :options="labelOptions">
        <template #first>
          <b-form-select-option :value="null" disabled>Please select a label</b-form-select-option>
        </template>
      </b-select>
    </b-form-group>
    <b-form-group
      label="Color"
      label-for="color"
      class="mb-32pt"
      label-class="form-label">
      <div class="d-flex align-items-center">
        <v-swatches
          v-model="color"
          show-fallback
          fallback-input-type="color"
          popover-x="left"
          disabled />
        <h5 class="mb-1 ml-2">{{ color }}</h5>
      </div>
    </b-form-group>
    <div class="d-flex justify-content-end">
      <b-button class="mr-3" variant="outline-danger" @click="hideModal">Close</b-button>
      <b-button :disabled="!labelId" variant="primary" @click="submit">Submit</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    projectType: {
      type: String,
      required: true
    },
    onClose: {
      type: Function,
      default: () => {
      }
    },
    onSubmit: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      labelId: null,
      color: ''
    }
  },
  computed: {
    ...mapGetters({
      isOpenProjectLabelModal: 'projects/isOpenProjectLabelModal',
      allLabels: 'label/getAllLabels'
    }),
    labelOptions() {
      const labelByProjectType = this.allLabels.filter(l => l.type === (this.projectType === 'Sequence Labeling' ? 'Concept' : 'Category'))
      return labelByProjectType.map(label => ({
        text: `${label.name} | ${label.value}`,
        value: label.id
      })).sort((o1, o2) => o1.text.localeCompare(o2.text))
    },
    isOpen: {
      get() {
        return this.isOpenProjectLabelModal
      },
      set(val) {
        this.setIsOpen(val)
      }
    }
  },
  watch: {
    labelId(val) {
      if (val) {
        const label = this.allLabels.find(l => l.id === val)
        this.color = label.color
      }
    }
  },
  methods: {
    ...mapMutations({
      setIsOpen: 'projects/setOpenAddProjectLabelModal'
    }),
    hideModal() {
      this.isOpen = false
      this.$emit('onClose')
    },
    submit() {
      const label = this.allLabels.find(l => l.id === this.labelId)
      label.color = this.color
      this.labelId = null
      this.isOpen = false
      this.$emit('onSubmit', label)
    }
  }
}
</script>
