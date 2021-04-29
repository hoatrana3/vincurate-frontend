<template>
  <b-modal v-model="isOpen" hide-footer hide-header centered no-close-on-backdrop>
    <div class="row">
      <div class="col-md-6">
        <b-form-group
          label="Name"
          label-for="name"
          label-class="form-label">
          <b-form-input
            v-model="name"
            id="name"
            placeholder="Name of label" />
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group
          label="Code"
          label-for="code"
          label-class="form-label">
          <b-form-input
            v-model="value"
            id="code"
            placeholder="Code of label" />
        </b-form-group>
      </div>
      <div class="col-12">
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
              popover-x="left" />
            <h5 class="mb-1 ml-2">{{ color }}</h5>
          </div>
        </b-form-group>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <b-button class="mr-3" variant="outline-danger" @click="hideModal">Close</b-button>
      <b-button :disabled="!name.length || !value.length" variant="primary" @click="submit">Submit</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      name: '',
      value: '',
      color: ''
    }
  },
  computed: {
    ...mapGetters({
      isOpenNewLabelModal: 'labels/isOpenNewLabelModal'
    }),
    isOpen: {
      get() {
        return this.isOpenNewLabelModal
      },
      set(val) {
        this.setIsOpen(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setIsOpen: 'labels/setOpenNewLabelModal'
    }),
    ...mapActions({
      createLabel: 'labels/createLabel'
    }),
    hideModal() {
      this.isOpen = false
      this.$emit('onClose')
    },
    submit() {
      this.doCreateLabel()
    },
    async doCreateLabel() {
      const data = {
        name: this.name,
        value: this.value,
        color: this.color
      }
      const handler = this.$apiHandler
        .build()
        .setData({ data })
        .addOnResponse((response) => {
          this.$notify.success(
            'Successfully create label!',
            'Your label is created, keep going!'
          )
          this.$helpers.initLabelCofigs()
          this.name = this.color = this.value = ''
          this.isOpen = false
          this.$emit('onCreated')
        })
      await this.createLabel(handler)
    }
  }
}
</script>
