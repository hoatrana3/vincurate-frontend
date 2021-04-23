<template>
  <div>
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="containerClass" />
    <div class="page-section border-bottom-2">
      <div :class="containerClass">
        <project-info-form @onSubmit="doCreateProject" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Page from '@/components/Page'
import ProjectInfoForm from '@/components/Projects/ProjectInfoForm'

export default {
  components: { ProjectInfoForm },
  extends: Page,
  layout: 'boxed',
  data() {
    return {
      title: 'New Project'
    }
  },
  methods: {
    ...mapActions({
      createProject: 'projects/createProject'
    }),
    async doCreateProject(data) {
      const handler = this.$apiHandler
        .build()
        .setData({ data })
        .addOnResponse((response) => {
          this.$notify.success(
            'Successfully create project!',
            'Your project is created, keep going!'
          )
          this.$router.push(`/user/projects/${response.getData().id}`)
        })
      await this.createProject(handler)
    }
  }
}
</script>
