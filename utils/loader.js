import Vue from 'vue'

export default () => ({
  $vs: Vue.prototype.$vs,
  LOADER_CONFIG: {
    type: 'circles',
    color: '#5567FF'
  },
  currentLoader: null,
  timeoutStop: null,
  startLoad() {
    if (this.timeoutStop) {
      clearTimeout(this.timeoutStop)
      this.timeoutStop = null
    } else if (!this.currentLoader) {
      this.currentLoader = this.$vs.loading(this.LOADER_CONFIG)
    }
  },
  stopLoad() {
    setTimeout(() => {
      if (!this.currentLoader) return
      this.currentLoader.close()
      this.currentLoader = null

      const loadingEl = document.querySelector('.vs-loading')
      if (loadingEl) document.body.removeChild(loadingEl)
      this.timeoutStop = null
    }, 500)
  }
})
