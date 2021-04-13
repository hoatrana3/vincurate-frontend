<template>
  <b-modal v-model="isOpen" hide-footer hide-header centered>
    <b-form-group
      label="Category"
      label-for="category"
      label-class="form-label">
      <v-select
        id="category"
        v-model="categoryId"
        placeholder="Select category"
        :options="categoryOptions"
        :reduce="item => item.value"
        :clearable="false"
        class="custom-v-select" />
    </b-form-group>
    <div class="d-flex justify-content-end">
      <b-button class="mr-3" variant="outline-danger" @click="hideModal">Close</b-button>
      <b-button :disabled="!categoryId" variant="primary" @click="submit">Submit</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
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
      categoryId: null,
      color: ''
    }
  },
  computed: {
    ...mapGetters({
      isOpenProjectCategoryModal: 'projects/isOpenProjectCategoryModal',
      allCategories: 'categories/getAllCategories'
    }),
    categoryOptions() {
      const options = this.allCategories.map(category => category.value).sort((c1, c2) => c1.localeCompare(c2))

      return [
        { label: 'Select All', value: -1 },
        ...options
      ]
    },
    isOpen: {
      get() {
        return this.isOpenProjectCategoryModal
      },
      set(val) {
        this.setIsOpen(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setIsOpen: 'projects/setOpenAddProjectCategoryModal'
    }),
    hideModal() {
      this.isOpen = false
      this.$emit('onClose')
    },
    submit() {
      let categories = []
      if (this.categoryId === -1) categories = this.allCategories
      else categories = [this.allCategories.find(l => l.id === this.categoryId)]

      this.categoryId = null
      this.isOpen = false
      this.$emit('onSubmit', categories)
    }
  }
}
</script>
