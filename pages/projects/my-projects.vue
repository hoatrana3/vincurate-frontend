<!--<template>-->
<!--  <div :class="containerClass">-->
<!--    <page-header-->
<!--      :title="title"-->
<!--      :breadcrumb="breadcrumb"-->
<!--      :container-class="null"-->
<!--      class="mb-32pt" />-->

<!--    <div class="page-section border-bottom-2">-->
<!--      <div :class="containerClass">-->
<!--        <resume-course />-->
<!--      </div>-->
<!--    </div>-->

<!--    <div-->
<!--      :class="containerClass"-->
<!--      class="page-section">-->

<!--      <div class="row card-group-row">-->
<!--        <div-->
<!--          v-for="item in items"-->
<!--          :key="item.id"-->
<!--          class="card-group-row__col col-md-6">-->
<!--          <quiz-card-->
<!--            :item="item" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <pager-->
<!--        class="mb-32pt" />-->

<!--      <quizzes-list />-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import cloneDeep from 'lodash/cloneDeep'-->
<!--import {-->
<!--  PageHeader,-->
<!--  PageSeparator-->
<!--} from 'vue-luma'-->
<!--import Page from '@/components/Page'-->
<!--import ArticleDetailsContent from '@/components/Articles/ArticleDetailsContent'-->
<!--import { mapGetters, mapMutations } from 'vuex'-->

<!--export default {-->
<!--  components: {-->
<!--    ArticleDetailsContent,-->
<!--    PageHeader,-->
<!--    PageSeparator-->
<!--  },-->
<!--  extends: Page,-->
<!--  layout: 'boxed',-->
<!--  async asyncData({ store, $apiHandler, $notify, redirect }) {-->
<!--    let article-->
<!--    const handler = $apiHandler-->
<!--      .build()-->
<!--      .setData({ params: ['60463ef15dfe800064939b80'] })-->
<!--      .addOnResponse(response => {-->
<!--        article = cloneDeep(response.getData())-->
<!--      })-->
<!--      .addOnError((e) => {-->
<!--        $notify.error(-->
<!--          'Article not found',-->
<!--          'We can not find the article you want'-->
<!--        )-->
<!--        redirect('/articles')-->
<!--      })-->
<!--    await store.dispatch('articles/fetchArticle', handler)-->

<!--    return { article }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      title: 'Labeling Article'-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapGetters({-->
<!--      currentArticle: 'articles/getCurrentArticle'-->
<!--    })-->
<!--  },-->
<!--  created() {-->
<!--    this.setSelectedConcepts(Object.keys(this.$helpers.getMainConcepts()))-->
<!--    this.setPickedFilters([])-->
<!--  },-->
<!--  mounted() {-->
<!--    this.setArticleContentSelectEvent()-->
<!--  },-->
<!--  methods: {-->
<!--    ...mapMutations({-->
<!--      setSelectedConcepts: 'articles/setSelectedConcepts',-->
<!--      setPickedFilters: 'articles/setPickedFilters'-->
<!--    }),-->
<!--    onArticleEdited(article) {-->
<!--      this.article = cloneDeep(article)-->
<!--    },-->
<!--    doSaveLabeling() {-->
<!--      this.article.units = this.$helpers.combinedUnitsToUnits(this.article)-->
<!--    },-->
<!--    setArticleContentSelectEvent() {-->
<!--      document.getElementById('article-content').addEventListener('mouseup', () => {-->
<!--        const selection = window.getSelection()-->
<!--        console.log(selection)-->
<!--        const startAnchor = selection.anchorOffset-->
<!--        const endAnchor = selection.focusOffset-->
<!--        const startEl = selection.anchorNode.parentElement-->
<!--        const endEl = selection.focusNode.parentElement-->
<!--        const startUnitIndex = startEl.getAttribute('unit-index')-->
<!--        const endUnitIndex = endEl.getAttribute('unit-index')-->
<!--        const startUnitConcept = startEl.getAttribute('unit-concept')-->

<!--        if (startUnitIndex === endUnitIndex && startUnitConcept === 'O') {-->
<!--          // TODO: We need to split combined units into more combined units-->
<!--          // But, to do that, we need to add to combined units indexes fileds the index of a origin unit start and end in all article-->
<!--          // Then in side this, we will compare with startAnchor and endAnchor, and then we can find the nearest origin unit and select it!-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
