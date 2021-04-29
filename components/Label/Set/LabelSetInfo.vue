<template>
  <div>
    <div class="d-flex mb-3">
      <b-btn
        :to="`/user/labels/manage`"
        class="mr-2"
        variant="light">
        <md-icon v-text="'arrow_back_ios'" class="mr-auto" />
        Back to Manage
      </b-btn>
      <b-btn
        :to="`/user/labels/sets/${currentLabelSet.id}/edit`"
        class="mr-2 ml-auto"
        variant="dark">
        <md-icon v-text="'mode_edit'" class="mr-2" />
        Edit
      </b-btn>
      <b-btn
        variant="accent"
        @click="doDelete">
        <md-icon v-text="'delete'" />
        Delete
      </b-btn>
    </div>
    <page-separator title="Basic information" />
    <b-form-group
      label="Article title"
      label-class="form-label">
      <h2 class="text-primary text-capitalize font-weight-bold">
        {{ currentLabelSet.name }}
      </h2>
    </b-form-group>
    <page-separator title="Set Labels" />
    <div class="card mb-0">
      <div class="card-header">
        <div
          class="row align-items-center"
          style="white-space: nowrap;">
          <div class="col-lg-auto">
            <form
              class="search-form search-form--light d-lg-inline-flex mb-8pt mb-lg-0">
              <b-form-input
                class="w-lg-auto"
                placeholder="Search labels" />
              <b-btn
                variant="flush"
                type="submit">
                <md-icon v-text="'search'" />
              </b-btn>
            </form>
          </div>
        </div>
      </div>

      <labels-table :labels="currentLabelSet.labels" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LabelsTable from '@/components/Label/LabelsTable'

export default {
  components: { LabelsTable },
  computed: {
    ...mapGetters({
      currentLabelSet: 'labelSets/getCurrentLabelSet'
    }),
  },
  methods: {
    ...mapActions({
      deleteLabelSet: 'labelSets/deleteLabelSet'
    }),
    doDelete() {
      const handler = this.$apiHandler
        .build()
        .setData({ params: [this.currentLabelSet.id] })
        .addOnResponse(() => {
          this.$notify.success(
            'Successfully delete label set',
            'Your label set is deleted'
          )

          this.$router.push('/user/labels/manage')
        })
      this.deleteLabelSet(handler)
    }
  }
}
</script>
