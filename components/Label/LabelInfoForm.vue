<template>
  <b-form @submit.prevent="saveLabel" class="px-0 page-section pt-0">
    <div class="row mb-3">
      <div class="col-md-6">
        <b-form-group
          label="Name"
          label-for="name"
          label-class="form-label">
          <b-form-input
            v-model="info.name"
            id="name"
            placeholder="Name of label" />
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group
          label="Code"
          label-for="code"
          label-class="form-label">
          <b-form-input
            v-model="info.value"
            id="code"
            placeholder="Code of label"
            :disabled="!forNew" />
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group
          label="Shortcut"
          label-for="shortcut"
          label-class="form-label">
          <b-form-input
            v-model="info.shortcut"
            id="shortcut"
            placeholder="Shortcut of label" />
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group
          label="Icon code"
          label-for="icon"
          label-class="form-label">
          <template #description>
            (*) Find icon code
            <b-link href="https://materialdesignicons.com/" target="_blank" class="text-underline font-weight-bold">here</b-link>.
            Example: <b>mdi mdi-home</b>
          </template>
          <b-form-input
            v-model="info.icon"
            id="icon"
            placeholder="Icon of label" />
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group
          label="Type"
          label-for="type"
          label-class="form-label">
          <b-select
            v-model="info.type"
            id="type"
            placeholder="Select label"
            :options="['Concept', 'Category']"
            :disabled="!forNew">
            <template #first>
              <b-form-select-option :value="null" disabled>Please select type of label</b-form-select-option>
            </template>
          </b-select>
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group
          label="Color"
          label-for="color"
          label-class="form-label">
          <div class="d-flex align-items-center">
            <v-swatches
              v-model="info.color"
              show-fallback
              fallback-input-type="color"
              popover-x="left" />
            <h5 class="mb-1 ml-2">{{ info.color }}</h5>
          </div>
        </b-form-group>
      </div>
    </div>

    <b-btn type="submit" variant="primary">
      Save Label
    </b-btn>
  </b-form>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    initLabel: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      info: {
        value: '',
        name: '',
        shortcut: '',
        icon: '',
        color: '',
        type: null
      }
    }
  },
  computed: {
    forNew() {
      return !this.initLabel
    }
  },
  watch: {
    initLabel: {
      immediate: true,
      handler(val) {
        if (val) {
          this.info = cloneDeep(val)
        }
      }
    }
  },
  methods: {
    saveLabel() {
      this.$emit('onSubmit', this.info)
    }
  }
}
</script>
