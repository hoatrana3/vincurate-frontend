<template>
  <div class="article-details-unit-filter-nav">
    <page-separator title="Filters" />
    <b-form-input
      v-model="filterField"
      placeholder="Type something..." />
    <div class="concepts-filter-container">
      <div
        v-for="[type, concept] of Object.entries(groupUnits)"
        :key="type"
        :style="`
        --concept-color: ${concept.color}
        `"
        class="concept-filter">
        <template
          v-if="type !== 'O' && unitsAfterFilterField(concept).length > 0">
          <span class="concept-filter--title">
            <i :class="concept.icon"></i>
            {{ concept.name }}
          </span>
          <div
            v-for="unit in unitsAfterFilterField(concept).slice(
              0,
              concept.currentShow
            )"
            :key="unit.name"
            class="concept-filter--item"
            :class="{ 'is-active': unit.active }"
            @click="onUnitToggle(unit)">
            <small class="concept-filter--item--name">{{ unit.name }}</small>
            <small class="concept-filter--item--count">
              ({{ unit.count }})
            </small>
          </div>
          <small
            v-if="concept.currentShow < unitsAfterFilterField(concept).length"
            class="concept-filter--show-control"
            @click="concept.currentShow += 5">
            Show More
            <md-icon>keyboard_arrow_down</md-icon>
          </small>
          <small
            v-else-if="unitsAfterFilterField(concept).length > 5"
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
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'
import { MdIcon } from 'vue-luma'

export default {
  components: { MdIcon },
  data() {
    return {
      filterField: '',
      groupUnits: []
    }
  },
  computed: {
    ...mapGetters({
      getPickedFilters: 'articles/getPickedFilters',
      getCurrentArticle: 'articles/getCurrentArticle'
    }),
    units() {
      return this.getCurrentArticle.combinedUnits
    },
    concepts() {
      return this.$helpers.UNIT_CONCEPTS
    }
  },
  created() {
    this.getGroupUnits()
  },
  methods: {
    ...mapMutations({
      setPickedFilters: 'articles/setPickedFilters',
      changeActiveUnitInFilter: 'articles/changeActiveUnitInFilter',
      addPickedFilter: 'articles/addPickedFilter',
      removePickedFilter: 'articles/removePickedFilter'
    }),
    getGroupUnits() {
      const results = _.cloneDeep(this.concepts)

      this.units.forEach((unit) => {
        const type = unit.type
        if (!results[type].units) results[type].units = []

        const units = results[type].units
        const unitName = unit.message.trim()
        const index = units.findIndex(
          (u) => u.name.toLowerCase() === unitName.toLowerCase()
        )

        if (index < 0) {
          units.push({
            name: unitName,
            type,
            active: false,
            count: 1
          })
        } else units[index].count++
      })

      Object.values(results).forEach((concept) => {
        if (concept.units)
          concept.units.sort((t1, t2) => {
            if (t2.count > t1.count) return 1
            if (t2.count < t1.count) return -1

            return t1.name.localeCompare(t2.name)
          })
        else concept.units = []

        concept.currentShow = 5
      })

      this.groupUnits = results
    },
    onUnitToggle(unit) {
      if (unit.active) {
        this.changeActiveUnitInFilter(unit)
        this.removePickedFilter(unit)
      } else {
        unit.active = true
        this.addPickedFilter(unit)
      }
    },
    unitsAfterFilterField(concept) {
      return concept.units.filter((u) =>
        u.name.toLowerCase().includes(this.filterField.toLowerCase())
      )
    }
  }
}
</script>
