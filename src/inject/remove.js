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
}

Filter.prototype.remove = function () {
  var removed = this.bg.remove()
  if (removed) this.el.style['-webkit-filter'] = ''
}

var filter = new Filter()

filter.remove()
