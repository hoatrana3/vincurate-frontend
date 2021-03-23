<template>
  <div>
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="containerClass" />
    <div class="page-section">
      <div :class="containerClass">
        <project-info />
      </div>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Page'
import ProjectInfo from '@/components/Projects/ProjectInfo'

export default {
  components: { ProjectInfo },
  extends: Page,
  layout: 'boxed',
  async asyncData({ store, params, $apiHandler, $notify, redirect }) {
    const handler = $apiHandler
      .build()
      .setData({ params: [params.id] })
      .addOnError((e) => {
        $notify.error(
          'Project not found',
          'We can not find the project you want'
        )
        redirect('/projects')
      })
    await store.dispatch('projects/fetchProject', handler)
  },
  data() {
    return {
      title: 'Project Details'
    }
  }
}
</script>
