<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="null"
      class="mb-32pt" />

    <page-separator title="Basic information" />
    <label-set-info-form @onSubmit="doCreateLabelSet" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Page from '@/components/Page'
import LabelSetInfoForm from '@/components/LabelSet/LabelSetInfoForm'

export default {
  components: { LabelSetInfoForm },
  extends: Page,
  layout: 'boxed',
  data() {
    return {
      title: 'New Label Set'
    }
  },
  methods: {
    ...mapActions({
      createLabelSet: 'labelSets/createLabelSet'
    }),
    async doCreateLabelSet(data) {
      const handler = this.$apiHandler
        .build()
        .setData({ data })
        .addOnResponse((response) => {
          this.$notify.success(
            'Successfully create label set!',
            'Your label set is created, keep going!'
          )
          this.$router.push('/labels/manage')
        })
      await this.createLabelSet(handler)
    }
  }
}
</script>
