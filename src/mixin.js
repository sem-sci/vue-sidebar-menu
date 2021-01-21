import pathToRegexp from 'path-to-regexp'
import LocationWatcher from './components/LocationWatcher'

export const itemMixin = {
  data () {
    return {
      itemShow: false,
      itemHover: false,
      location: null,
      item: null,
      prevExactActive: false
    }
  },
  created () {
    this.item = this.menuItem
    LocationWatcher.addChangeListener(this.onLocationChanged)
    this.onLocationChanged()
    if (this.item.child && !this.showChild && !this.item.isPopout) {
      this.itemShow = this.active
    }
  },
  destroyed () {
    LocationWatcher.removeChangeListener(this.onLocationChanged)
  },
  methods: {
    onLocationChanged () {
      this.location = { href: LocationWatcher.href, pathname: LocationWatcher.pathname, hash: LocationWatcher.hash, search: LocationWatcher.search }
    },
    isShowActive (item) {
      return this.activeShow === item || (item.child && item.child.some(childItem => {
        return this.isShowActive(childItem)
      }))
    },
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
        const current = this.useVueRouter ? this.$route.fullPath : this.location.pathname + this.location.search + this.location.hash
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
        return exactPath ? href === this.location.pathname || href === this.location.pathname + '/' : this.matchExactRoute(href)
      }
    },
    matchExactRoute (href) {
      if (!href) return false
      if (this.useVueRouter) {
        const { route } = this.$router.resolve(href)
        return route.fullPath === this.$route.fullPath
      } else {
        return href === this.location.pathname + this.location.search + this.location.hash || href === this.location.pathname + '/' + this.location.search + this.location.hash
      }
    },
    clickEvent (event) {
      if (this.item.disabled) return

      this.emitItemClick(event, this.item, this)

      if (this.isPopout && !this.isMobileItem) {
        if (!this.mobileItem || this.mobileItem !== this.item) {
          this.emitSetMobileItem({ item: this.item, itemEl: event.currentTarget.offsetParent })
        }
        if (this.hover || this.item.child) return
        this.emitUnsetMobileItem(true)
      }

      if (this.item.child && (!this.item.href || this.exactActive)) {
        if (this.showOneChild) {
          this.activeShow === this.item ? this.emitActiveShow(null) : this.emitActiveShow(this.item)
        } else {
          this.itemShow = !this.itemShow
        }
      }
      this.$nextTick(() => {
         this.$refs.parent.$el.scrollIntoView({behavior: 'smooth'})
      })
    },
    mouseEnterEvent (event) {
      event.stopPropagation()
      if (this.item.disabled) return
      if (!this.itemHover && !this.isPopout && !this.isMobileItem && !this.isMobileItemChild && this.mobileItem !== this.item) {
        this.emitUnsetMobileItem(true)
      } else if (this.isMobileItem || this.isMobileItemChild) {
        this.emitUnsetMobileItem(true)
        this.emitStopMobileTimerClose()
      }
      this.itemHover = true
      if (this.hover) return
      if (this.isPopout && !this.isMobileItem && !this.isMobileItemChild) {
        this.emitSetMobileItem({ item: this.item, itemEl: event.currentTarget })
      }
    },
    mouseLeaveEvent (event) {
      event.stopPropagation()
      this.itemHover = false
    },
    emitSetMobileItem ({ item, itemEl }) {
      this.$emit('set-mobile-item', { 'item': item, 'itemEl': itemEl })
    },
    emitUnsetMobileItem (delayed) {
      this.$emit('unset-mobile-item', delayed)
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
    },
    active () {
      return this.isLinkActive(this.item)
    },
    exactActive () {
      const exactActive = this.isLinkExactActive(this.item)
      if (exactActive && !this.prevExactActive) {
        if (this.showOneChild && this.activeShow !== this.item) {
          this.emitActiveShow(this.item)
        }
      }
      this.prevExactActive = exactActive
      return exactActive
    }
  },
  watch: {
    menuItem (newItem, oldItem) {
      this.item = newItem
      this.emitItemUpdate(newItem, oldItem)
    },
    activeShow (newItem) {
      if (newItem) {
        this.itemShow = this.isShowActive(this.item)
      }
    }
  },
  inject: ['emitActiveShow', 'emitItemClick', 'emitItemUpdate', 'emitStopMobileTimerClose']
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
      el.style.height = el.scrollHeight + 'px'
    }
  }
}
