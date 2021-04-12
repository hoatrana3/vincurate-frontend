<template>
  <div>
    <page-header
      :title="title"
      :breadcrumb="breadcrumb"
      :container-class="containerClass" />
    <div class="page-section">
      <div :class="containerClass">
        <page-separator title="Information" />

        <div class="row">
          <div class="col-md-4">
            <b-form-group
              label="Project title"
              class="mb-32pt"
              label-class="form-label">
              <b-form-input
                :value="currentProject.title"
                disabled />
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group
              label="Curated type"
              label-for="curated-type"
              class="mb-32pt"
              label-class="form-label"
              description="* The curated data given in the file">
              <v-select
                id="curated-type"
                v-model="dataTypes"
                multiple
                placeholder="Select data type"
                :options="Object.values($helpers.PROJECT_TYPES)"
                class="custom-v-select" />
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group
              label="Upload type"
              label-for="upload-type"
              label-class="form-label"
              description="* Please select upload type to choose files">
              <v-select
                id="upload-type"
                v-model="uploadType"
                placeholder="Select upload type"
                :options="uploadTypes"
                :reduce="item => item.value"
                :clearable="false"
                class="custom-v-select" />
            </b-form-group>
          </div>
        </div>

        <page-separator title="Process" class="mt-3" />

        <div class="mb-32pt d-flex align-items-center">
          <small class="chip chip-outline-dark">Total: {{ articleFiles.length }}</small>
          <small class="chip chip-outline-success">Success: {{ successFiles.length }}</small>
          <small class="chip chip-outline-danger">Failure: {{ failureFiles.length }}</small>
          <b-btn
            variant="accent"
            size="sm"
            class="ml-auto"
            @click.prevent="clearAll">
            Clear All
          </b-btn>
        </div>

        <div
          v-if="isUploading"
          class="d-flex align-items-center mb-3">
          <b-progress
            variant="primary"
            :max="progressTotal"
            show-progress
            show-value
            animated
            class="flex">
            <b-progress-bar
              :value="progressCount"
              :label="`${Math.round((progressCount / progressTotal) * 100)}%`" />
          </b-progress>
        </div>

        <div class="row mb-8pt">
          <div class="col-md-6 col-lg-4">
            <div class="card stack stack--2">
              <div class="card-header d-flex align-items-center">
                <div class="flex">
                  <h4 class="card-title text-primary">In Progress</h4>
                  <div class="card-subtitle text-70">Choose files to upload</div>
                </div>
                <i class="material-icons text-black-20">info_outline</i>
              </div>
              <ul class="list-group list-group-flush border-top-0">
                <li v-if="!isUploading" class="list-group-item">
                  <a class="text-body d-flex align-items-center justify-content-center">
                    <b-btn
                      block
                      :disabled="!uploadType"
                      variant="light"
                      @click.prevent="openFileUploadInput">
                      Choose files
                    </b-btn>
                    <input
                      ref="uploadInput"
                      type="file"
                      :accept="fileAccept"
                      multiple
                      class="d-none"
                      @change="onFilesUploaded" />
                  </a>
                </li>
                <template v-else>
                  <li
                    v-for="(file, index) in progressFiles"
                    :key="index"
                    class="list-group-item">
                    <a class="text-body d-flex align-items-center">
                      <strong class="flex">{{ file.file.name }}</strong>
                      <i class="material-icons text-black-20">trending_flat</i>
                    </a>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card stack stack--1">
              <div class="card-header d-flex align-items-center">
                <div class="flex">
                  <h4 class="card-title text-success">Success</h4>
                  <div class="card-subtitle text-70">Files successfully uploaded</div>
                </div>
                <i class="material-icons text-black-20">info_outline</i>
              </div>
              <ul class="list-group list-group-flush border-top-0">
                <li
                  v-for="(file, index) in successFiles"
                  :key="index"
                  class="list-group-item">
                  <a class="text-body d-flex align-items-center">
                    <strong class="flex">{{ file.file.name }}</strong>
                    <i class="material-icons text-black-20">check</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="card stack stack--1">
              <div class="card-header d-flex align-items-center">
                <div class="flex">
                  <h4 class="card-title text-danger">Failure</h4>
                  <div class="card-subtitle text-70">Files failed to upload</div>
                </div>
                <i class="material-icons text-black-20">info_outline</i>
              </div>
              <ul class="list-group list-group-flush border-top-0">
                <li
                  v-for="(file, index) in failureFiles"
                  :key="index"
                  class="list-group-item">
                  <a class="text-body d-flex align-items-center">
                    <strong class="flex">{{ file.file.name }}</strong>
                    <b-btn
                      v-b-tooltip.hover.bottom="'Retry'"
                      variant="light"
                      pill
                      size="sm"
                      :disabled="isUploading || file.isUploading"
                      @click.prevent="() => onRetry(file)">
                      <i class="material-icons text-black-70">autorenew</i>
                    </b-btn>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import reject from 'lodash/reject'
import Page from '@/components/Page.vue'
import {
  PageHeader,
  PageSeparator
} from 'vue-luma'

export default {
  components: {
    PageHeader,
    PageSeparator
  },
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
      title: 'Upload Articles',
      articleFiles: [],
      progressFiles: [],
      successFiles: [],
      failureFiles: [],
      dataTypes: [],
      uploadType: null,
      isUploading: false,
      progressCount: 0,
      progressTotal: 0
    }
  },
  computed: {
    ...mapGetters({
      currentProject: 'projects/getCurrentProject'
    }),
    uploadTypes() {
      const types = [{
        label: 'Use NER format',
        value: 'FORMAT_NER'
      }, {
        label: 'Use JSONL format',
        value: 'FORMAT_JSONL'
      }, {
        label: 'Use ConLL format',
        value: 'FORMAT_CONLL'
      }, {
        label: 'Use Plain text format',
        value: 'FORMAT_PLAIN'
      }]

      if (!this.dataTypes || !this.dataTypes.length) return [types[3]]
      if (this.dataTypes.length > 1) return [types[1], types[3]]
      if (this.$helpers.isSeqLabelProject({ types: this.dataTypes })) return types

      return [types[1], types[3]]
    },
    fileAccept() {
      switch (this.uploadType) {
        case 'FORMAT_NER':
          return '.csv'
        case 'FORMAT_JSONL':
          return '.json,.jsonl'
        case 'FORMAT_CONLL':
          return '.csv,.conll'
        default:
          return '*'
      }
    }
  },
  methods: {
    ...mapActions({
      uploadArticle: 'articles/uploadArticle'
    }),
    openFileUploadInput() {
      this.$refs.uploadInput.click()
    },
    async onFilesUploaded(e) {
      const files = [...e.target.files]
      this.progressFiles = []
      files.forEach((file) => {
        this.progressFiles.push({
          file,
          isUploading: true,
          isSuccess: false
        })
      })
      this.articleFiles.push(...this.progressFiles)

      this.progressCount = 0
      this.progressTotal = this.progressFiles.length

      this.isUploading = true
      for await (const index of this.uploadAsyncGenerator(this.progressFiles)) {
        // TODO: What to do with last current inserted index
      }

      this.$notify.primary(
        'Upload completed',
        'All files are uploaded, please check the results!'
      )
      this.isUploading = false
    },
    async * uploadAsyncGenerator(files) {
      const step = 5
      let index = 0

      while (index < files.length) {
        const splitedFiles = files.slice(index, index + step)
        await this.uploadMultipleFiles(splitedFiles)

        index += step
        yield index
      }
    },
    async uploadMultipleFiles(files) {
      const allPromises = files.map((file) => this.uploadSingleArticle(file))
      await Promise.all(allPromises)
    },
    async uploadSingleArticle(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('projectId', this.currentProject.id)
      formData.append('method', this.uploadType)

      const handler = this.$apiHandler
        .build()
        .setData({ data: formData })
        .addOnStarts(() => {
          file.isUploading = true
        })
        .addOnResponse(() => {
          file.isSuccess = true
          this.successFiles.push(file)
        })
        .addOnError(() => {
          this.failureFiles.push(file)
        })
        .addOnFinally(() => {
          this.progressFiles = reject(this.progressFiles, f => f === file)
          this.progressCount++
          file.isUploading = false
        })

      return await this.uploadArticle(handler)
    },
    async onRetry(file) {
      if (file.isUploading || file.isSuccess) return

      const index = this.failureFiles.findIndex((f) => f === file)

      if (index >= 0) {
        this.isUploading = true

        this.failureFiles.splice(index, 1)
        this.progressFiles.push(file)

        this.progressCount = 0
        this.progressTotal = this.progressFiles.length

        await this.uploadSingleArticle(file)

        if (file.isSuccess)
          this.$notify.success(
            'Retry successfully',
            'Your file re-uploaded successfully!'
          )
        else
          this.$notify.error(
            'Retry failed',
            'Your file is failed to re-uploaded!'
          )

        this.isUploading = false
      }
    },
    clearAll() {
      if (this.isUploading) {
        this.$notify.error(
          'Can not clear now',
          'There are files uploading, please wait for them to clear!'
        )
      } else {
        this.articleFiles = []
        this.progressFiles = []
        this.successFiles = []
        this.failureFiles = []
      }
    }
  }
}
</script>
