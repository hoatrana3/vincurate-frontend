<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />
    <label-info-form :init-label="label" @onSubmit="doUpdateLabel" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Page from '@/components/Page'
import LabelInfoForm from '@/components/Label/LabelInfoForm'

export default {
  components: { LabelInfoForm },
  extends: Page,
  layout: 'boxed',
  async asyncData({ store, params, $apiHandler, $notify, redirect }) {
    let label = null
    const handler = $apiHandler
      .build()
      .setData({ params: [params.id] })
      .addOnResponse(response => {
        label = response.getData()
      })
      .addOnError((e) => {
        $notify.error(
          'Label not found',
          'We can not find the label you want'
        )
        redirect('/labels/my-labels')
      })
    await store.dispatch('labels/fetchLabel', handler)

    return {
      label
    }
  },
  data() {
    return {
      title: 'New Label'
    }
  },
  methods: {
    ...mapActions({
      updateLabel: 'labels/updateLabel'
    }),
    async doUpdateLabel({ name, shortcut, icon, color }) {
      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.label.id],
          data: { name, shortcut, icon, color },
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Successfully update label!',
            'Your label is updated, keep going!'
          )
          this.$helpers.setGlobalCssClasses([response.getData()])
          this.$router.push('/labels/my-labels')
        })
      await this.updateLabel(handler)
    }
  }
}
</script>
