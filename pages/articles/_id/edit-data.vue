<template>
  <div :class="containerClass">
    <page-header
      :title="title"
      :breadcrumb="breadcrumb" />

    <div class="page-section">
      <page-separator title="Project concepts" />
      <div class="d-flex flex-wrap align-items-center mb-3">
        <b-btn
          v-for="label in labels"
          :key="label.id"
          pill
          size="sm"
          class="btn-label mr-2 mb-2"
          :class="`has-${label.value}-background-color has-${label.value}-border-color`"
          @click="() => doLabel(label)">
          <small>{{ label.name }}</small>
          <b-badge
            pill
            variant="light"
            class="ml-2 mb-0">x
            {{ label.value }}
          </b-badge>
        </b-btn>
      </div>
      <div class="card stack stack--2">
        <article-content-renderer
          ref="articleContent"
          id="article-content"
          :article="currentArticle"
          editable
          force-active
          class="card-body" />
      </div>
      <b-btn
        variant="primary"
        class="mr-2"
        @click="doSaveForReview">
        Save for reviewing
      </b-btn>
      <b-btn
        variant="accent"
        @click="doSaveDirectly">
        Save to origin data
      </b-btn>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters, mapActions } from 'vuex'
import {
  PageHeader,
  PageSeparator
} from 'vue-luma'
import Page from '@/components/Page'
import ArticleContentRenderer from '@/components/Articles/ArticleContentRenderer'

export default {
  components: {
    ArticleContentRenderer,
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
          'Article not found',
          'We can not find the article you want'
        )
        redirect('/articles')
      })
    await store.dispatch('articles/fetchArticle', handler)

    const currentArticle = store.getters['articles/getCurrentArticle']
    const labels = store.getters['label/getAllLabels'].filter(l => currentArticle.project.labels.includes(l.id))

    return {
      labels
    }
  },
  data() {
    return {
      title: 'Sequence Labeling',
      info: null
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: 'articles/getCurrentArticle',
      currentUser: 'users/getCurrentUser'
    }),
    saveHandler() {
      const data = {
        annotations: this.$refs.articleContent.getAnnotations()
      }

      return this.$apiHandler
        .build()
        .setData({
          params: [this.info.id],
          data
        })
        .addOnResponse((response) => {
          this.$notify.success(
            'Updated article',
            'Your article annotations is successfully updated'
          )
          this.$router.push(`/articles/${response.getData().id}`)
        })
    }
  },
  created() {
    this.info = cloneDeep(this.currentArticle)
  },
  methods: {
    ...mapActions({
      updateArticleAnnotations: 'articles/updateArticleAnnotations',
      createArticleEditVersion: 'articles/createArticleEditVersion'
    }),
    doSaveDirectly() {
      this.updateArticleAnnotations(this.saveHandler)
    },
    doSaveForReview() {
      this.createArticleEditVersion(this.saveHandler)
    },
    doLabel(label) {
      const selection = window.getSelection()
      const startAnchor = selection.anchorOffset
      const endAnchor = selection.focusOffset
      const startEl = selection.anchorNode.parentElement
      const endEl = selection.focusNode.parentElement

      if (startEl === endEl && startAnchor !== endAnchor) {
        const offsetStartEl = startEl.getAttribute('offset-start')
        const offsetStartContent = parseInt(offsetStartEl) + startAnchor
        const offsetEndContent = parseInt(offsetStartEl) + endAnchor
        const newAnnotation = {
          article: this.currentArticle.id,
          label,
          offsetStart: offsetStartContent,
          offsetEnd: offsetEndContent,
          user: this.currentUser.id
        }

        this.$refs.articleContent.addTextAnnotation(newAnnotation)
      }
    }
  }
}
</script>
