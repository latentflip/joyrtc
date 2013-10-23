function ButtonView(opts) {
  if (!opts.button) throw "Button required";
  this.button = opts.button;
  this.width = opts.width || 100;
  this.height = opts.height || 100;
  this.top = opts.top || 0;
  this.left = opts.left || 0;
  this.template = opts.template || "";
  this.$el = $('<div>');
}

ButtonView.prototype.render = function render() {
  this.$el.append(this.template);
  this.$el.css({
    width: this.width,
    height: this.height,
    top: this.top,
    left: this.left,
    position: 'absolute'
  })
  this.bindEvents();
};

ButtonView.prototype.bindEvents = function bindEvents() {
  this.$el.on('touchstart', this.button.press)
  this.$el.on('touchend', this.button.release)
  this.$el.on('touchleave', this.button.release)
};

ButtonView.prototype.appendTo = function appendTo($target) {
  this.render();
  $target.append(this.$el);
  return this;
};

module.exports = ButtonView;
