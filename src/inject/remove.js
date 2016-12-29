function FilterStyle () {
  this.el = document.getElementById('ext-invertor-styles')
}

FilterStyle.prototype.remove = function () {
  if (!this.el) return
  this.el.remove()
}

function FilterBg () {
  this.id = 'ext-invertor-bg'
  this.el = document.getElementById(this.id)
}

FilterBg.prototype.remove = function () {
  if (!this.el) return
  this.el.remove()
  return true
}

function Filter () {
  this.el = document.documentElement
  this.bg = new FilterBg()
  this.style = new FilterStyle()
}

Filter.prototype.remove = function () {
  var removed = this.bg.remove()
  if (removed) {
    this.el.style['-webkit-filter'] = ''
    this.style.remove()
  }
}

var filter = new Filter()

filter.remove()
