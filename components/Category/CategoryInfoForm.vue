<template>
  <b-form @submit.prevent="saveCategory" class="px-0 page-section pt-0">
    <div class="row mb-3">
      <div class="col-md-6">
        <b-form-group
          label="Value"
          label-for="value"
          label-class="form-label">
          <b-form-input
            v-model="info.value"
            id="value"
            placeholder="Value of category" />
        </b-form-group>
      </div>
    </div>

    <b-btn type="submit" variant="primary">
      Save Category
    </b-btn>
  </b-form>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    initCategory: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      info: {
        value: ''
      }
    }
  },
  computed: {
    forNew() {
      return !this.initCategory
    }
  },
  watch: {
    initCategory: {
      immediate: true,
      handler(val) {
        if (val) {
          this.info = cloneDeep(val)
        }
      }
    }
  },
  methods: {
    saveCategory() {
      this.$emit('onSubmit', this.info)
    }
  }
}
</script>
