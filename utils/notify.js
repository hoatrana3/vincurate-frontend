import Vue from 'vue'

export default () => ({
  $vs: Vue.prototype.$vs,
  BASE_OPTIONS: {
    position: 'top-right',
    duration: 6000,
  },
  primary(title, text) {
    this.$vs.notification({
      ...this.BASE_OPTIONS,
      color: 'primary',
      border: 'primary',
      title,
      text,
      icon: "<i class='mdi mdi-message-processing'></i>",
    })
  },
  success(title, text) {
    this.$vs.notification({
      ...this.BASE_OPTIONS,
      color: 'success',
      border: 'success',
      title,
      text,
      icon: "<i class='mdi mdi-check'></i>",
    })
  },
  error(title, text) {
    this.$vs.notification({
      ...this.BASE_OPTIONS,
      color: 'danger',
      border: 'danger',
      title,
      text,
      icon: "<i class='mdi mdi-alert-octagon'></i>",
    })
  },
  warning(title, text) {
    this.$vs.notification({
      ...this.BASE_OPTIONS,
      color: 'warn',
      border: 'warn',
      title,
      text,
      icon: "<i class='mdi mdi-alert'></i>",
    })
  },
  custom(title, text, options) {
    this.$vs.notification({
      ...this.BASE_OPTIONS,
      ...options,
      title,
      text,
    })
  },
})
