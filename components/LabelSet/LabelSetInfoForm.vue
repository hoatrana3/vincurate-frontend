<template>
  <div>
    <b-form @submit.prevent="saveLabelSet" class="px-0 page-section pt-0">
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
        <div class="col-12">
          <b-form-group
            label="Labels"
            label-for="labels"
            label-class="form-label">
            <project-labels-table
              id="labels"
              :labels="info.labels"
              class="mb-32pt"
              @removeLabel="removeLabel">
              <template v-slot:table-left-header>
                <b-btn
                  exact
                  variant="accent"
                  @click="() => setOpenAddProjectLabelModal(true)"
                  v-text="'Add label'" />
              </template>
            </project-labels-table>
          </b-form-group>
        </div>
      </div>

      <b-btn type="submit" variant="primary">
        Save Label set
      </b-btn>
    </b-form>

    <add-project-label-modal @onSubmit="addNewLabels" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import ProjectLabelsTable from '@/components/Projects/ProjectLabelsTable'
import AddProjectLabelModal from '@/components/Projects/AddProjectLabelModal'

export default {
  components: { AddProjectLabelModal, ProjectLabelsTable },
  props: {
    initLabelSet: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      info: {
        name: '',
        labels: []
      }
    }
  },
  computed: {
    forNew() {
      return !this.initLabel
    }
  },
  watch: {
    initLabelSet: {
      immediate: true,
      handler(val) {
        if (val) {
          this.info = cloneDeep(val)
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setOpenAddProjectLabelModal: 'projects/setOpenAddProjectLabelModal'
    }),
    saveLabelSet() {
      this.$emit('onSubmit', {
        name: this.info.name,
        labels: this.info.labels.map(l => l.id)
      })
    },
    addNewLabels(newLabels) {
      this.info.labels.push(
        ...newLabels.filter(l => this.info.labels.findIndex(_l => _l.id === l.id) < 0)
      )
    },
    removeLabel(item) {
      const index = this.info.labels.findIndex(l => l.id === item.id)
      if (index >= 0) this.info.labels.splice(index, 1)
    }
  }
}
</script>
