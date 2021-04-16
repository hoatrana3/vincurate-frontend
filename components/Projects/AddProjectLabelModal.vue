<template>
  <div>
    <b-modal v-model="isOpen" hide-footer hide-header centered>
      <b-form-group
        label="Label Set"
        label-for="label-set"
        label-class="form-label">
        <v-select
          id="label-set"
          v-model="labelSetId"
          placeholder="Select label set"
          :options="labelSetOptions"
          :reduce="item => item.value"
          :clearable="false"
          class="custom-v-select" />
      </b-form-group>
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
          class="custom-v-select"
          :disabled="!labelSetId" />
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
        <b-button class="mr-auto" variant="outline-light" @click="() => setOpenNewLabelModal(true)">Create new
        </b-button>
        <b-button class="mr-3" variant="outline-danger" @click="hideModal">Close</b-button>
        <b-button :disabled="!labelId" variant="primary" @click="submit">Submit</b-button>
      </div>
    </b-modal>

    <new-label-modal />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
      labelSetId: null,
      labelId: null,
      color: ''
    }
  },
  computed: {
    ...mapGetters({
      isOpenProjectLabelModal: 'projects/isOpenProjectLabelModal',
      userId: 'users/getCurrentUserId',
      userLabels: 'users/getUserLabels',
      userLabelSets: 'users/getUserLabelSets'
    }),
    currentLabels() {
      const selectedSet = this.userLabelSets.find(ls => ls.id === this.labelSetId)
      return selectedSet ? selectedSet.labels : this.userLabels
    },
    labelSetOptions() {
      const options = this.userLabelSets.map(labelSet => ({
        label: labelSet.name,
        value: labelSet.id
      })).sort((o1, o2) => o1.label.localeCompare(o2.label))

      return [
        { label: 'Select All', value: -1 },
        ...options
      ]
    },
    labelOptions() {
      const options = this.currentLabels.map(label => ({
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
    labelSetId() {
      this.labelId = null
    },
    labelId(val) {
      if (!val || val === -1) {
        this.color = ''
        return
      }

      const label = this.currentLabels.find(l => l.id === val)
      this.color = label.color
    }
  },
  created() {
    this.fetchUserLabelInfos()
  },
  methods: {
    ...mapMutations({
      setIsOpen: 'projects/setOpenAddProjectLabelModal',
      setOpenNewLabelModal: 'labels/setOpenNewLabelModal'
    }),
    ...mapActions({
      getUserLabels: 'users/getUserLabels',
      getUserLabelSets: 'users/getUserLabelSets'
    }),
    async fetchUserLabelInfos() {
      console.log('hihihihii')
      const userId = this.userId
      const handler = this.$apiHandler
        .build()
        .setData({ params: [userId] })
      await this.getUserLabels(handler)
      await this.getUserLabelSets(handler)
    },
    async fetchUserLabelSets() {
      const userId = this.userId
      const handler = this.$apiHandler
        .build()
        .setData({ params: [userId] })
      await this.getUserLabels(handler)
    },
    hideModal() {
      this.isOpen = false
      this.$emit('onClose')
    },
    submit() {
      let labels = []
      if (this.labelId === -1) labels = this.currentLabels
      else labels = [this.currentLabels.find(l => l.id === this.labelId)]

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

