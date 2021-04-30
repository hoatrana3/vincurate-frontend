<template>
  <b-form @submit.prevent="saveArticle" class="px-0 page-section pt-0">
    <b-form-group
      label="Title"
      label-for="title"
      label-class="form-label">
      <b-form-input
        v-model="info.title"
        id="title"
        placeholder="Title of article" />
    </b-form-group>

    <b-form-group
      label="Content"
      label-for="content"
      label-class="form-label">
      <b-form-textarea
        v-model="info.content"
        id="content"
        size="lg"
        rows="15"
        max-rows="25"
        placeholder="Content of article" />
      <template
        v-if="!forNew"
        v-slot:description>
        <span class="text-danger font-weight-medium">
          * Old annotations <u>might be wrong</u> after you change the article's content
        </span>
      </template>
    </b-form-group>

    <b-btn type="submit" variant="primary">
      Save Article
    </b-btn>
  </b-form>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    initArticle: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      info: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    forNew() {
      return !this.initArticle
    }
  },
  watch: {
    initArticle: {
      immediate: true,
      handler(val) {
        if (val) {
          this.info = cloneDeep(val)
        }
      }
    }
  },
  methods: {
    saveArticle() {
      this.$emit('onSubmit', this.info)
    }
  }
}
</script>
