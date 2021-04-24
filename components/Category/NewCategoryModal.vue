<template>
  <b-modal v-model="isOpen" hide-footer hide-header centered no-close-on-backdrop>
    <b-form-group
      label="Value"
      label-for="value"
      label-class="form-label">
      <b-form-input
        v-model="value"
        id="value"
        placeholder="Value of category" />
    </b-form-group>
    <div class="d-flex justify-content-end">
      <b-button class="mr-3" variant="outline-danger" @click="hideModal">Close</b-button>
      <b-button :disabled="!value.length" variant="primary" @click="submit">Submit</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import apiHandler from '@/api/apiHandler'

export default {
  data() {
    return {
      value: '',
    }
  },
  computed: {
    ...mapGetters({
      isOpenNewCategoryModal: 'categories/isOpenNewCategoryModal'
    }),
    isOpen: {
      get() {
        return this.isOpenNewCategoryModal
      },
      set(val) {
        this.setIsOpen(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setIsOpen: 'categories/setOpenNewCategoryModal'
    }),
    ...mapActions({
      createCategory: 'categories/createCategory',
      getUserCategories: 'users/getUserCategories'
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
        value: this.value,
      }
      const handler = this.$apiHandler
        .build()
        .setData({ data })
        .addOnResponse(async (response) => {
          this.$notify.success(
            'Successfully create category!',
            'Your category is created, keep going!'
          )
          this.value = ''
          this.isOpen = false
          this.$emit('onCreated')
        })
      await this.createCategory(handler)
    }
  }
}
</script>
