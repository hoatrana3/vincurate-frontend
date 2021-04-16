<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />
    <label-set-info-form :init-label-set="labelSet" @onSubmit="doUpdateLabelSet" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Page from '@/components/Page'
import LabelSetInfoForm from '@/components/Label/Set/LabelSetInfoForm'

export default {
  components: { LabelSetInfoForm },
  extends: Page,
  layout: 'boxed',
  async asyncData({ store, params, $apiHandler, $notify, redirect }) {
    let labelSet = null
    const handler = $apiHandler
      .build()
      .setData({ params: [params.id] })
      .addOnResponse(response => {
        labelSet = response.getData()
      })
      .addOnError((e) => {
        $notify.error(
          'Label set not found',
          'We can not find the label set you want'
        )
        redirect('/labels/manage')
      })
    await store.dispatch('labelSets/fetchLabelSet', handler)

    return {
      labelSet
    }
  },
  data() {
    return {
      title: 'Edit Label set'
    }
  },
  methods: {
    ...mapActions({
      updateLabelSet: 'labelSets/updateLabelSet'
    }),
    async doUpdateLabelSet({ name, labels }) {
      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.labelSet.id],
          data: { name, labels },
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Successfully update label set!',
            'Your label set is updated, keep going!'
          )
          this.$router.push('/labels/manage')
        })
      await this.updateLabelSet(handler)
    }
  }
}
</script>
