<template>
  <fragment>
    <b-form-group
      label="Current Content"
      label-class="form-label">
      <b-form-textarea
        v-model="article.content"
        size="lg"
        rows="10"
        max-rows="20"
        disabled />
    </b-form-group>

    <b-form-group
      label="Your Translation"
      label-for="translation"
      label-class="form-label">
      <b-form-textarea
        v-model="translation"
        id="translation"
        size="lg"
        rows="10"
        max-rows="20"
        placeholder="Your translation here" />
    </b-form-group>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    forNew: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      translation: ''
    }
  },
  computed: mapGetters({
    currentUser: 'users/getCurrentUser'
  }),
  watch: {
    article: {
      immediate: true,
      handler(val) {
        this.translation = ''

        if (!this.forNew && val && val.translation) {
          this.translation = val.translation.content
        }
      }
    }
  },
  methods: {
    getEditedTranslation() {
      return {
        content: this.translation,
        creator: this.currentUser.id
      }
    }
  }
}
</script>
