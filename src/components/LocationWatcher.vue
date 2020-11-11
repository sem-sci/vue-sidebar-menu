<script>
export default {
  props: {
    pollInterval: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      urlPoller: undefined,
      hash: null,
      href: null,
      host: null,
      hostname: null,
      origin: null,
      pathname: null,
      port: null,
      protocol: null,
      search: null,
      listeners: []
    }
  },
  created () {
    if (this.pollInterval) {
      this.urlPoller = setInterval(() => {
        if (this.href !== window.location.href) {
          this.locationChanged()
        }
      }, this.pollInterval)
    }
    window.addEventListener('hashchange', this.locationChanged)
    this.locationChanged()
  },
  destroyed () {
    if (this.urlPoller) {
      clearInterval(this.urlPoller)
    }
    window.removeEventListener('hashchange', this.locationChanged)
  },
  methods: {
    locationChanged () {
      this.hash = window.location.hash
      this.href = window.location.href
      this.host = window.location.host
      this.hostname = window.location.hostname
      this.origin = window.location.origin
      this.pathname = window.location.pathname
      this.port = window.location.port
      this.protocol = window.location.protocol
      this.search = window.location.search
      this.listeners.forEach((listenerFunc) => listenerFunc())
    },
    addChangeListener (listenerFunc) {
      this.listeners.push(listenerFunc)
    },
    removeChangeListener (listenerFunc) {
      const removeIndex = this.listeners.indexOf(listenerFunc)
      if (removeIndex !== -1) {
        this.listeners.splice(removeIndex, 1)
      }
    }
  }
}
</script>
