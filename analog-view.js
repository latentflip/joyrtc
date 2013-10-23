var AnalogView = function AnalogView(opts) {
  console.log(opts);
  if (!opts.analog) throw "Analog Required";
  this.analog = opts.analog;
  this.width = opts.width || 100;
  this.height = opts.height || 100;
  this.top = opts.top || 0;
  this.left = opts.left || 0;
  this.template = opts.template || "";
  this.$el = $('<div>');
  this.position = [0,0];

  this.touchstart = this.touchstart.bind(this);
  this.touchmove = this.touchmove.bind(this);
  this.touchend = this.touchend.bind(this);
};

AnalogView.prototype.render = function render() {
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

AnalogView.prototype.appendTo = function appendTo($target) {
  this.render();
  $target.append(this.$el);
  return this;
};

AnalogView.prototype.bindEvents = function bindEvents() {
  var self = this;
  this.$el.on('touchstart', function(ev) {
    self.touchstart(ev)
    self.touchmove(ev);
  });
  this.$el.on('touchmove', this.touchmove);
  this.$el.on('touchend touchleave', this.touchend);
};


var offset, width, height;
var getTouchEventPosition = function getTouchEventPosition($el, ev) {
  var originalEvent = ev.originalEvent.changedTouches[0];
  offset = offset || $el.offset();
  width = width || $el.outerWidth();
  height = height || $el.outerHeight();
  
  return [
    (originalEvent.clientX - offset.left)/(height/2) - 1,
    (originalEvent.clientY - offset.top)/(width/-2) + 1
  ]
};

AnalogView.prototype.touchstart = function touchstart(ev) {
  this.analog.on();
  this.analog.move.apply(this.analog, getTouchEventPosition(this.$el, ev));
};

AnalogView.prototype.touchmove = function touchmove(ev) {
  this.analog.move.apply(this.analog, getTouchEventPosition(this.$el, ev));
};

AnalogView.prototype.touchend = function touchend(ev) {
  this.analog.off();
};

module.exports = AnalogView;
