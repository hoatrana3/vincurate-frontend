<script>
import layoutConfigMixin from '~/mixins/layout-config'
import { routeToMixin } from 'vue-luma'

export default {
  mixins: [
    layoutConfigMixin,
    routeToMixin
  ],
  layout({ store, route }) {
    return route.params.layout ? route.params.layout : store.getters.settings.layout.layout
  },
  data() {
    return {
      title: null
    }
  },
  computed: {
    breadcrumb() {
      let frags = this.$route.fullPath.split('/')
      frags = frags.slice(1, frags.length - 1)

      const routes = frags.map((route, index) => ({
        text: route.replaceAll('-', ' '),
        href: `/${frags.slice(0, index + 1).join('/')}`
      }))

      return [
        {
          text: this.$t('Home'),
          to: this.routeTo(this.routes.home)
        },
        ...routes,
        {
          text: this.$t(this.title),
          active: true
        }
      ]
    },
    headerClass() {
      return null
    },
    headerEffects() {
      return 'waterfall'
    },
    headerImage() {
      return null
    },
    headerContentClass() {
      return null
    },
    headerCondenses() {
      return false
    },
    headerContentComponent() {
      return null
    },
    headerContentComponentProps() {
      return null
    },
    guest() {
      return false
    },
    subLayout() {
      return false
    },
    subLayoutHasScrollingRegion() {
      return true
    },
    subLayoutDrawer() {
      return false
    },
    subLayoutDrawerId() {
      return 'sub-layout-drawer'
    },
    subLayoutDrawerAlign() {
      return 'end'
    }
  },
  created() {
    this.emitOptions()
  },
  methods: {
    emitOptions() {
      const options = [
        'guest',
        'subLayout',
        'subLayoutHasScrollingRegion',
        'subLayoutDrawerId',
        'subLayoutDrawerAlign',
        'subLayoutDrawer',
        'headerClass',
        'headerEffects',
        'headerImage',
        'headerContentClass',
        'headerCondenses',
        'headerContentComponent',
        'headerContentComponentProps'
      ]

      options.map(option => {
        if (this[option] !== undefined) {
          this.$root.$emit(`luma::${option}`, this[option])
        }
      })
    }
  },
  head() {
    return {
      title: `${this.$t(this.title)} | ${this.$store.state.brand}`
    }
  }
}
</script>
