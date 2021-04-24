<template>
  <div>
    <b-modal v-model="isOpen" hide-footer hide-header centered no-close-on-backdrop>
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
        <b-button class="mr-auto" variant="outline-light" @click="() => setOpenNewCategoryModal(true)">Create new
        </b-button>
        <b-button class="mr-3" variant="outline-danger" @click="hideModal">Close</b-button>
        <b-button :disabled="!categoryId" variant="primary" @click="submit">Submit</b-button>
      </div>
    </b-modal>
    <new-category-modal @onCreated="fetchUserCategories" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import NewCategoryModal from '@/components/Category/NewCategoryModal'

export default {
  components: { NewCategoryModal },
  data() {
    return {
      categoryId: null,
      color: ''
    }
  },
  computed: {
    ...mapGetters({
      isOpenProjectCategoryModal: 'projects/isOpenProjectCategoryModal',
      userId: 'users/getCurrentUserId',
      userCategories: 'users/getUserCategories',
    }),
    categoryOptions() {
      const options = this.userCategories.map(category => ({
        label: category.value,
        value: category.id
      })).sort((o1, o2) => o1.label.localeCompare(o2.label))

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
  created() {
    this.fetchUserCategories()
  },
  methods: {
    ...mapMutations({
      setIsOpen: 'projects/setOpenAddProjectCategoryModal',
      setOpenNewCategoryModal: 'categories/setOpenNewCategoryModal'
    }),
    ...mapActions({
      getUserCategories: 'users/getUserCategories',
    }),
    async fetchUserCategories() {
      const userId = this.userId
      const handler = this.$apiHandler
        .build()
        .setData({ params: [userId] })
      await this.getUserCategories(handler)
    },
    hideModal() {
      this.isOpen = false
      this.$emit('onClose')
    },
    submit() {
      let categories = []
      if (this.categoryId === -1) categories = this.userCategories
      else categories = [this.userCategories.find(l => l.id === this.categoryId)]

      this.categoryId = null
      this.isOpen = false
      this.$emit('onSubmit', categories)
    }
  }
}
</script>
