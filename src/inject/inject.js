function FilterBg () {
  this.id = 'ext-invertor-bg'
  this.el = document.createElement('div')
  this.el.id = this.id
  this.el.style.position = 'fixed'
  this.el.style.bottom = this.el.style.right = this.el.style.left = this.el.style.top = '0px'
  this.el.style.backgroundColor = 'white'
  this.el.style.zIndex = '-9999'
}

FilterBg.prototype.add = function () {
  document.body.insertBefore(this.el, document.body.firstChild)
}

FilterBg.prototype.remove = function () {
  document.getElementById(this.id).remove()
}

function Filter () {
  this.el = document.documentElement
  this.bg = new FilterBg()
}

Filter.prototype.apply = function () {
  this.bg.add()
  this.el.style['-webkit-filter'] = 'invert(87%)'
}

Filter.prototype.undo = function () {
  this.bg.remove()
  this.el.style['-webkit-filter'] = ''
}

Filter.prototype.isApplied = function () {
  return this.el.style['-webkit-filter']
}

Filter.prototype.toggle = function () {
  return this.isApplied() ? this.undo() : this.apply()
}

var filter = new Filter()

filter.toggle()
