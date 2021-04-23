<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />
    <category-info-form @onSubmit="doCreateCategory" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Page from '@/components/Page'
import CategoryInfoForm from '@/components/Category/CategoryInfoForm'

export default {
  components: { CategoryInfoForm },
  extends: Page,
  layout: 'boxed',
  data() {
    return {
      title: 'New Category'
    }
  },
  methods: {
    ...mapActions({
      createCategory: 'categories/createCategory',
      getAllCategories: 'categories/getAllCategories'
    }),
    async doCreateCategory(data) {
      const handler = this.$apiHandler
        .build()
        .setData({ data })
        .addOnResponse((response) => {
          this.$notify.success(
            'Successfully create category!',
            'Your category is created, keep going!'
          )
          this.$router.push(`/user/categories/my-categories`)
        })
      await this.createCategory(handler)
    }
  }
}
</script>
