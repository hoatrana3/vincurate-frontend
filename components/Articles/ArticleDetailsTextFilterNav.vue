<template>
  <div class="article-details-text-filter-nav">
    <page-separator title="Filters" />
    <b-form-input
      v-model="filterField"
      placeholder="Type something..." />
    <div class="concepts-filter-container">
      <div
        v-for="[type, concept] of Object.entries(groupKeywords)"
        :key="type"
        :style="`
        --concept-color: ${getConceptColor(concept.color)}
        `"
        class="concept-filter">
        <template
          v-if="textsAfterFilterField(concept).length > 0">
          <span class="concept-filter--title">
            <i :class="concept.icon"></i>
            {{ concept.name }}
          </span>
          <div
            v-for="text in textsAfterFilterField(concept).slice(
              0,
              concept.currentShow
            )"
            :key="text.text"
            class="concept-filter--item"
            :class="{ 'is-active': text.active }"
            @click="onTextToggle(text)">
            <small class="concept-filter--item--name">{{ text.text }}</small>
            <small class="concept-filter--item--count">
              ({{ text.count }})
            </small>
          </div>
          <small
            v-if="concept.currentShow < textsAfterFilterField(concept).length"
            class="concept-filter--show-control"
            @click="concept.currentShow += 5">
            Show More
            <md-icon>keyboard_arrow_down</md-icon>
          </small>
          <small
            v-else-if="textsAfterFilterField(concept).length > 5"
            class="concept-filter--show-control"
            @click="concept.currentShow = 5">
            Show Less
            <md-icon>keyboard_arrow_up</md-icon>
          </small>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import hexRgb from 'hex-rgb'
import { mapGetters, mapMutations } from 'vuex'
import { MdIcon } from 'vue-luma'

export default {
  components: { MdIcon },
  data() {
    return {
      filterField: '',
      groupKeywords: []
    }
  },
  computed: {
    ...mapGetters({
      allConceptLabels: 'label/getAllLabels',
      currentArticle: 'articles/getCurrentArticle'
    })
  },
  created() {
    this.getGroupKeywords()
  },
  methods: {
    ...mapMutations({
      addPickedFilter: 'articles/addPickedFilter',
      removePickedFilter: 'articles/removePickedFilter'
    }),
    getGroupKeywords() {
      const results = {}
      this.allConceptLabels.forEach(l => {
        results[l.value] = {
          ...l,
          currentShow: 5,
          texts: []
        }
      })

      this.currentArticle.annotations.forEach(anno => {
        const label = anno.label
        const text = this.currentArticle.content.substring(anno.offsetStart, anno.offsetEnd).trim()
        const index = results[label.value].texts.findIndex(
          (t) => t.text.toLowerCase() === text.toLowerCase()
        )

        if (index < 0) {
          results[label.value].texts.push({
            text,
            active: false,
            count: 1
          })
        } else results[label.value].texts[index].count++
      })

      Object.values(results).forEach((concept) => {
        concept.texts.sort((t1, t2) => {
          if (t2.count > t1.count) return 1
          if (t2.count < t1.count) return -1

          return t1.text.localeCompare(t2.text)
        })
      })

      this.groupKeywords = results
    },
    onTextToggle(text) {
      if (text.active) this.removePickedFilter(text)
      else this.addPickedFilter(text)
    },
    textsAfterFilterField(concept) {
      return concept.texts.filter((t) =>
        t.text.toLowerCase().includes(this.filterField.toLowerCase())
      )
    },
    getConceptColor(color) {
      const rgbColor = hexRgb(color)
      return `${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue}`
    }
  }
}
</script>
