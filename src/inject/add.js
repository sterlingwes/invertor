var filterWeight = '87%'

function FilterStyle () {
  this.id = 'ext-invertor-styles'
  if (document.getElementById(this.id)) return
  this.el = document.createElement('style')
  this.el.id = this.id
  this.el.type = 'text/css'
  this.el.innerText = 'img { filter: invert(100%) !important }'
}

FilterStyle.prototype.add = function () {
  if (!this.el) return
  document.body.insertBefore(this.el, document.body.firstChild)
}

function FilterBg () {
  this.id = 'ext-invertor-bg'
  if (document.getElementById(this.id)) return
  this.el = document.createElement('div')
  this.el.id = this.id
  this.el.style.position = 'fixed'
  this.el.style.bottom = this.el.style.right = this.el.style.left = this.el.style.top = '0px'
  this.el.style.backgroundColor = 'white'
  this.el.style.zIndex = '-9999'
}

FilterBg.prototype.add = function () {
  if (!this.el) return
  document.body.insertBefore(this.el, document.body.firstChild)
  return true
}

function Filter () {
  this.el = document.documentElement
  this.bg = new FilterBg()
  this.style = new FilterStyle()
}

Filter.prototype.apply = function () {
  var added = this.bg.add()
  if (added) {
    this.el.style['-webkit-filter'] = 'invert(' + filterWeight + ')'
    this.style.add()
  }
}

var filter = new Filter()

filter.apply()
