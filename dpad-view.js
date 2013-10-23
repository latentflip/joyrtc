var DpadView = function(opts) {
  if (!opts.buttons) throw "Buttons required";
  this.buttons = opts.buttons;
  this.width = opts.width || 100;
  this.height = opts.height || 100;
  this.top = opts.top || 0;
  this.left = opts.left || 0;
  this.template = opts.template || "";
  this.$el = $('<div>');
}

DpadView.prototype.render = function render() {
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

DpadView.prototype.bindEvents = function bindEvents() {
  var self = this;
  var offset, width, height;

  var clientX, clientY;

  this.$el.on('touchstart touchmove', function(ev) {
    var originalEvent = ev.originalEvent.changedTouches[0];
    offset = offset || self.$el.offset();
    width = width || self.$el.outerWidth();
    height = height || self.$el.outerHeight();
    
    var x = (originalEvent.clientX - offset.left)/(height/2) - 1;
    var y = (originalEvent.clientY - offset.top)/(width/-2) + 1;

    y > 0.5 ? self.buttons.up.press() : self.buttons.up.release();
    y < -0.5 ? self.buttons.down.press() : self.buttons.down.release();
    
    x > 0.5 ? self.buttons.right.press() : self.buttons.right.release();
    x < -0.5 ? self.buttons.left.press() : self.buttons.left.release();
  })

  this.$el.on('touchleave touchend', function() {
    self.buttons.up.release();
    self.buttons.down.release();

    self.buttons.right.release();
    self.buttons.left.release();
  });
}

DpadView.prototype.appendTo = function appendTo($target) {
  this.render();
  $target.append(this.$el);
  return this;
};

module.exports = DpadView;
