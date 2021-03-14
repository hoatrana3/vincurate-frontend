import Vue from 'vue'

export default () => ({
  LOADER_CONFIG: {
    type: 'circles',
    color: '#5567FF',
  },
  currentLoader: null,
  startLoad() {
    this.currentLoader = Vue.prototype.$vs.loading(this.LOADER_CONFIG)
  },
  stopLoad() {
    if (!this.currentLoader) return
    this.currentLoader.close()

    const loadingEl = document.querySelector('.vs-loading');
    if (loadingEl) document.body.removeChild(loadingEl)
  }
})
