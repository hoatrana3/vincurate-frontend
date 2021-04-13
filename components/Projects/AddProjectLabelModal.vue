<template>
  <div>
    <b-modal v-model="isOpen" hide-footer hide-header centered>
      <b-form-group
        label="Label"
        label-for="label"
        label-class="form-label">
        <v-select
          id="label"
          v-model="labelId"
          placeholder="Select label"
          :options="labelOptions"
          :reduce="item => item.value"
          :clearable="false"
          class="custom-v-select" />
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
        <b-button class="mr-auto" variant="outline-light" @click="() => setOpenNewLabelModal(true)">Create new</b-button>
        <b-button class="mr-3" variant="outline-danger" @click="hideModal">Close</b-button>
        <b-button :disabled="!labelId" variant="primary" @click="submit">Submit</b-button>
      </div>
    </b-modal>

    <new-label-modal />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NewLabelModal from '@/components/Label/NewLabelModal'

export default {
  components: { NewLabelModal },
  props: {
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
      allLabels: 'labels/getAllLabels'
    }),
    labelOptions() {
      const options = this.allLabels.map(label => ({
        label: `${label.name} | ${label.value}`,
        value: label.id
      })).sort((o1, o2) => o1.label.localeCompare(o2.label))

      return [
        { label: 'Select All', value: -1 },
        ...options
      ]
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
      if (!val || val === -1) {
        this.color = ''
        return
      }

      const label = this.allLabels.find(l => l.id === val)
      this.color = label.color
    }
  },
  methods: {
    ...mapMutations({
      setIsOpen: 'projects/setOpenAddProjectLabelModal',
      setOpenNewLabelModal: 'labels/setOpenNewLabelModal'
    }),
    hideModal() {
      this.isOpen = false
      this.$emit('onClose')
    },
    submit() {
      let labels = []
      if (this.labelId === -1) labels = this.allLabels
      else labels = [this.allLabels.find(l => l.id === this.labelId)]

      this.labelId = null
      this.isOpen = false
      this.$emit('onSubmit', labels)
    }
  }
}

/* TODO:
Label set
Project types
Project continous labeling
Project visibility

Sửa lại luồng lấy labels thêm vào các nơi, đúng là phải lấy user labels, hiện tại đang lấy all labels

Viết báo cáo dần = Latex
ML tích hợp = Auto label hoặc Suggestion
*/

</script>

