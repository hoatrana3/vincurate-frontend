<template>
  <div>
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="containerClass" />
    <div class="page-section">
      <div :class="containerClass">
        <label-set-info />
      </div>
    </div>
  </div>
</template>

<script>
import {
  PageHeader,
} from 'vue-luma'
import Page from '@/components/Page'
import LabelSetInfo from '@/components/LabelSet/LabelSetInfo'

export default {
  components: {
    LabelSetInfo,
    PageHeader,
  },
  extends: Page,
  layout: 'boxed',
  async asyncData({ store, params, $apiHandler, $notify, redirect }) {
    const handler = $apiHandler
      .build()
      .setData({ params: [params.id] })
      .addOnError((e) => {
        $notify.error(
          'Label set not found',
          'We can not find the label set you want'
        )
        redirect('/labels/manage')
      })
    await store.dispatch('labelSets/fetchLabelSet', handler)
  },
  data() {
    return {
      title: 'Label Set Details'
    }
  },
}
</script>
