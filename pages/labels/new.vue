<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />
    <label-info-form @onSubmit="doCreateLabel" />
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
  data() {
    return {
      title: 'New Label'
    }
  },
  methods: {
    ...mapActions({
      createLabel: 'labels/createLabel',
    }),
    async doCreateLabel(data) {
      const handler = this.$apiHandler
        .build()
        .setData({ data })
        .addOnResponse((response) => {
          this.$notify.success(
            'Successfully create label!',
            'Your label is created, keep going!'
          )
          this.$helpers.initLabelCofigs()
          this.$router.push(`/labels/manage`)
        })
      await this.createLabel(handler)
    }
  }
}
</script>
