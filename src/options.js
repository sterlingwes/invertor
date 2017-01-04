/* globals chrome */

function saveOptions () {
  chrome.storage.sync.set({
    defaultOn: document.getElementById('default').checked
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status')
    status.style.opacity = 1
    setTimeout(function () {
      status.style.opacity = 0
    }, 750)
  })
}

function restoreOptions () {
  chrome.storage.sync.get({
    defaultOn: false
  }, function (items) {
    document.getElementById('default').checked = items.defaultOn
  })
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('save').addEventListener('click',
    saveOptions)
