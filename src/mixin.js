import pathToRegexp from 'path-to-regexp'

export const itemMixin = {
  data () {
    return {
      active: false,
      exactActive: false,
      itemShow: false,
      itemHover: false,
      urlPoller: undefined,
      oldUrl: window.location.href
    }
  },
  created () {
    if (this.item.header || this.item.component) return
    this.initState()

    if (!this.useVueRouter) {
      if (this.useLocationPolling) {
        this.urlPoller = setInterval(() => {
          if (this.oldUrl !== window.location.href) {
            this.oldUrl = window.location.href
            this.initState()
          }
        }, 300)
      } else {
        window.addEventListener('hashchange', this.initState)
      }
    }
  },
  destroyed () {
    if (this.urlPoller) {
      clearInterval(this.urlPoller)
    }
    if ((!this.useVueRouter) && !this.useLocationPolling) {
      window.removeEventListener('hashchange', this.onHashChange)
    }
  },
  methods: {
    isLinkActive (item) {
      return this.matchRoute(item) || this.isChildActive(item.child) || this.isAliasActive(item)
    },
    isLinkExactActive (item) {
      return this.matchExactRoute(item.href)
    },
    isChildActive (child) {
      if (!child) return false
      return child.some(item => {
        return this.isLinkActive(item)
      })
    },
    isAliasActive (item) {
      if (item.alias) {
        const current = this.useVueRouter ? this.$route.fullPath : window.location.pathname + window.location.search + window.location.hash
        if (Array.isArray(item.alias)) {
          return item.alias.some(alias => {
            return pathToRegexp(alias).test(current)
          })
        } else {
          return pathToRegexp(item.alias).test(current)
        }
      }
      return false
    },
    matchRoute ({ href, exactPath }) {
      if (!href) return false
      if (this.useVueRouter) {
        const { route } = this.$router.resolve(href)
        return exactPath ? route.path === this.$route.path : this.matchExactRoute(href)
      } else {
        return exactPath ? href.indexOf(window.location.pathname) === 0 : this.matchExactRoute(href)
      }
    },
    matchExactRoute (href) {
      if (!href) return false
      if (this.useVueRouter) {
        const { route } = this.$router.resolve(href)
        return route.fullPath === this.$route.fullPath
      } else {
        return href.indexOf(window.location.pathname + window.location.search + window.location.hash) === 0
      }
    },
    clickEvent (event) {
      if (this.item.disabled) return

      this.emitItemClick(event, this.item, this)

      if (this.isPopout && !this.isMobileItem) {
        if (!this.mobileItem || this.mobileItem !== this.item) {
          this.$emit('set-mobile-item', { item: this.item, itemEl: event.currentTarget.offsetParent })
        }
        if (this.hover || this.item.child) return
        this.$emit('unset-mobile-item', true)
      }

      if (this.showChild || this.isMobileItem) return
      if (this.item.child && (!this.item.href || this.exactActive)) {
        if (this.showOneChild) {
          this.activeShow === this.item ? this.emitActiveShow(null) : this.emitActiveShow(this.item)
        } else {
          this.itemShow = !this.itemShow
        }
      }
    },
    initState () {
      this.initActiveState()
      this.initShowState()
    },
    initActiveState () {
      this.active = this.isLinkActive(this.item)
      this.exactActive = this.isLinkExactActive(this.item)
    },
    initShowState () {
      if (this.item.child && !this.showChild) {
        if (this.showOneChild) {
          if (this.active) {
            this.emitActiveShow(this.item)
            this.itemShow = true
          } else {
            if (this.item === this.activeShow) {
              this.emitActiveShow(null)
              this.itemShow = false
            }
          }
        } else {
          if (this.active) {
            this.itemShow = true
          }
        }
      }
    },
    mouseEnterEvent (event) {
      event.stopPropagation()
      if (this.item.disabled) return
      if (!this.itemHover && !this.isMobileItem && !this.isMobileItemChild && this.mobileItem !== this.item) {
        this.$emit('unset-mobile-item')
      }
      this.itemHover = true
      if (this.hover) return
      if (this.isPopout && !this.isMobileItem) {
        this.$emit('set-mobile-item', { item: this.item, itemEl: event.currentTarget })
      }
    },
    mouseLeaveEvent (event) {
      event.stopPropagation()
      this.itemHover = false
    }
  },
  computed: {
    useVueRouter () {
      return this.$router && !this.disableVueRouter
    },
    isRouterLink () {
      return (this.useVueRouter && this.item && this.item.href !== undefined && !this.item.external) === true
    },
    isFirstLevel () {
      return this.level === 1
    },
    isPopout () {
      return (this.isCollapsed && this.isFirstLevel) || (this.item.isPopout && !this.isMobileItemChild)
    },
    show () {
      if (!this.item.child) return false
      if (this.showChild || this.isMobileItem) return true
      return this.itemShow
    },
    itemLinkClass () {
      return [
        'vsm--link',
        !this.isMobileItem ? `vsm--link_level-${this.level}` : '',
        { 'vsm--link_mobile-item': this.isMobileItem },
        { 'vsm--link_hover': this.hover },
        { 'vsm--link_active': this.active },
        { 'vsm--link_exact-active': this.exactActive },
        { 'vsm--link_disabled': this.item.disabled },
        this.item.class
      ]
    },
    itemClass () {
      return [
        'vsm--item',
        { 'vsm--item_open': this.show },
        !this.isMobileItem ? `vsm--item_level-${this.level}` : '',
        { 'vsm--item_mobile-item': this.isMobileItem },
        { 'vsm--item_hover': this.hover },
        { 'vsm--item_disabled': this.item.disabled },
        this.item.class
      ]
    },
    isItemHidden () {
      if (this.isCollapsed) {
        if (this.item.hidden && this.item.hiddenOnCollapse === undefined) {
          return true
        } else {
          return this.item.hiddenOnCollapse === true
        }
      } else {
        return this.item.hidden === true
      }
    },
    itemLinkHref () {
      if (!this.item.href || this.item.disabled) return null
      return this.item.href
    },
    hover () {
      if (this.isPopout) {
        return this.item === this.mobileItem
      }
      return this.itemHover
    },
    itemLinkTag () {
      if (!this.itemLinkHref) return 'span'
      return this.isRouterLink ? 'router-link' : 'a'
    }
  },
  watch: {
    $route () {
      if (!this.disableVueRouter) {
        setTimeout(() => {
          if (this.item.header || this.item.component) return
          this.initState()
        }, 1)
      }
    },
    item (newItem, item) {
      this.emitItemUpdate(newItem, item)
    },
    activeShow () {
      this.itemShow = this.item === this.activeShow
    }
  },
  inject: ['emitActiveShow', 'emitItemClick', 'emitItemUpdate']
}

export const animationMixin = {
  methods: {
    expandEnter (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    expandAfterEnter (el) {
      el.style.height = 'auto'
    },
    expandBeforeLeave (el) {
      if (this.isPopout) {
        el.style.display = 'none'
        return
      }
      el.style.height = el.scrollHeight + 'px'
    }
  }
}
