<template>
  <fragment>
    <div class="d-flex flex-wrap align-items-center mb-3">
      <b-btn
        v-for="category in categories"
        :key="category.id"
        pill
        size="sm"
        class="mr-2 mb-2 has-category"
        @click="() => doClassify(category)">
        <small>{{ category.value }}</small>
      </b-btn>
    </div>
    <b-card>
      <span v-if="!selectedCategories || !selectedCategories.length" class="text-danger">No categories selected</span>
      <div v-else class="d-flex flex-wrap align-items-center">
        <b-btn
          v-for="(category, index) in selectedCategories"
          :key="category.id"
          pill
          size="sm"
          class="mr-2 has-category"
          @click="() => removeCategory(category, index)">
          <small>{{ category.value }}</small>
        </b-btn>
      </div>
    </b-card>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedCategories: []
    }
  },
  computed: {
    ...mapGetters({
      allCategories: 'categories/getAllCategories',
      currentUser: 'users/getCurrentUser'
    }),
    categories() {
      return this.allCategories.filter(c => {
        const index = this.selectedCategories.findIndex(_c => c.value === _c.value)
        return index < 0 && this.article.project.categories.includes(c.id)
      })
    }
  },
  watch: {
    article: {
      immediate: true,
      handler(val) {
        this.selectedCategories = [...val.categories]
      }
    }
  },
  methods: {
    doClassify(category) {
      this.selectedCategories.push(category)
    },
    removeCategory(category, index) {
      this.selectedCategories.splice(index, 1)
    },
    getEditedCategories() {
      return this.selectedCategories
    }
  }
}
</script>
