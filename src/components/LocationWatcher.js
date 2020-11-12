const internals = {
  pollInterval: undefined,
  urlPoller: undefined,
  listeners: []
}

const LocationWatcher = {
  hash: window.location.hash,
  href: window.location.href,
  host: window.location.host,
  hostname: window.location.hostname,
  origin: window.location.origin,
  pathname: window.location.pathname,
  port: window.location.port,
  protocol: window.location.protocol,
  search: window.location.search,
  addChangeListener (listenerFunc) {
    internals.listeners.push(listenerFunc)
  },
  removeChangeListener (listenerFunc) {
    const removeIndex = internals.listeners.indexOf(listenerFunc)
    if (removeIndex !== -1) {
      internals.listeners.splice(removeIndex, 1)
    }
  }
}

function locationChanged () {
  LocationWatcher.hash = window.location.hash
  LocationWatcher.href = window.location.href
  LocationWatcher.host = window.location.host
  LocationWatcher.hostname = window.location.hostname
  LocationWatcher.origin = window.location.origin
  LocationWatcher.pathname = window.location.pathname
  LocationWatcher.port = window.location.port
  LocationWatcher.protocol = window.location.protocol
  LocationWatcher.search = window.location.search
  internals.listeners.forEach((listenerFunc) => listenerFunc())
}

Object.defineProperty(LocationWatcher, 'pollInterval', {
  get: () => internals.pollInterval,
  set: (v) => {
    internals.pollInterval = v
    if (internals.urlPoller) {
      clearInterval(internals.urlPoller)
    }
    if (internals.pollInterval) {
      internals.urlPoller = setInterval(() => {
        if (LocationWatcher.href !== window.location.href) {
          locationChanged()
        }
      }, internals.pollInterval)
    }
  }
})
window.addEventListener('hashchange', locationChanged)

LocationWatcher.pollInterval = 300

export default LocationWatcher
