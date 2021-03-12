import Vue from 'vue'

export default () => ({
  $vs: Vue.prototype.$vs,
  LOADER_CONFIG: {
    type: 'circles',
    color: '#5567FF',
    target: 'body'
  },
  currentLoader: null,
  startLoad() {
    this.currentLoader = this.$vs.loading(this.LOADER_CONFIG)
  },
  stopLoad() {
    if (!this.currentLoader) return
    this.currentLoader.close()

    const loadingEl = document.querySelector('.vs-loading');
    if (loadingEl) document.body.removeChild(loadingEl)
  }
})
