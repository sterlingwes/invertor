/* globals chrome, localStorage */

var sites = {}

load()

console.log('init bg: ', sites)

function load () {
  var index = getIndex()
  index.forEach(host => {
    sites[host] = JSON.parse(localStorage.getItem(host))
  })
}

function getIndex () {
  return JSON.parse(localStorage.getItem('siteIndex') || '[]')
}

function setIndex (sites) {
  localStorage.setItem('siteIndex', JSON.stringify(sites))
}

function enableSite (host) {
  localStorage.setItem(host, 'true')
  sites[host] = true
}

function disableSite (host) {
  localStorage.removeItem(host)
  delete sites[host]
}

function add (host) {
  console.log('adding', host)
  enableSite(host)
  setIndex(
    getIndex().concat(host)
  )
}

function remove (host) {
  console.log('removing', host)
  disableSite(host)
  var index = getIndex().slice(0)
  var location = index.indexOf(host)
  if (location >= 0) {
    index.splice(location, 1)
    setIndex(index)
  }
}

function toggle (host) {
  if (sites[host]) {
    remove(host)
    undo()
  } else {
    add(host)
    apply()
  }
}

function getHost (url) {
  return url
    .replace(/^https?:\/\//, '')
    .split('/')
    .shift()
}

function apply () {
  chrome.tabs.executeScript({
    allFrames: true,
    file: 'src/inject/add.js'
  })
}

function undo () {
  chrome.tabs.executeScript({
    allFrames: true,
    file: 'src/inject/remove.js'
  })
}

chrome.tabs.onUpdated.addListener(
  function (tabId, evt, tab) {
    if (evt.status && evt.status === 'complete' && tab.active) {
      if (!tab.url) return console.warn('no url')
      var host = getHost(tab.url)
      console.log('host', host, sites[host])
      if (sites[host]) apply()
      else undo()
    }
  }
)

chrome.browserAction.onClicked.addListener(function (tab) {
  toggle(getHost(tab.url))
})
