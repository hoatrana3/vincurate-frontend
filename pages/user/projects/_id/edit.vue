<template>
  <div>
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="containerClass" />
    <div class="page-section border-bottom-2">
      <div :class="containerClass">
        <project-info-form :for-new="false" @onSubmit="doUpdateProject" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Page from '@/components/Page'
import ProjectInfoForm from '@/components/Projects/ProjectInfoForm'

export default {
  components: { ProjectInfoForm },
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
        redirect('/user/projects/my-projects')
      })
    await store.dispatch('projects/fetchProject', handler)
  },
  data() {
    return {
      title: 'Edit Project'
    }
  },
  computed: mapGetters({
    currentProject: 'projects/getCurrentProject'
  }),
  methods: {
    ...mapActions({
      updateProject: 'projects/updateProject'
    }),
    async doUpdateProject(data) {
      const handler = this.$apiHandler
        .build()
        .setData({
          params: [this.currentProject.id],
          data,
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Successfully update project!',
            'Your project is updated, keep going!'
          )
          this.$router.push(`/user/projects/${response.getData().id}`)
        })
      await this.updateProject(handler)
    }
  }
}
</script>
