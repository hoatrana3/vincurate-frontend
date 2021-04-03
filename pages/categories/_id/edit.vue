<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />
    <category-info-form :init-category="category" @onSubmit="doUpdateCategory" />
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
  async asyncData({ store, params, $apiHandler, $notify, redirect }) {
    let category = null
    const handler = $apiHandler
      .build()
      .setData({ params: [params.id] })
      .addOnResponse(response => {
        category = response.getData()
      })
      .addOnError((e) => {
        $notify.error(
          'Category not found',
          'We can not find the category you want'
        )
        redirect('/categories/my-categories')
      })
    await store.dispatch('categories/fetchCategory', handler)

    return {
      category
    }
  },
  data() {
    return {
      title: 'New Category'
    }
  },
  methods: {
    ...mapActions({
      updateCategory: 'categories/updateCategory'
    }),
    async doUpdateCategory({ value }) {
      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.category.id],
          data: { value },
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Successfully update category!',
            'Your category is updated, keep going!'
          )
          this.$router.push('/categories/my-categories')
        })
      await this.updateCategory(handler)
    }
  }
}
</script>
