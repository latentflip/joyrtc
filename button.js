function Button(opts) {
  this.cord = opts.cord;
  this.name = opts.name;
  this.repeatRate = opts.repeatRate || 100;
  this.press = this.press.bind(this);
  this.release = this.release.bind(this);
  this.startInterval = this.startInterval.bind(this);
  this.stopInterval = this.stopInterval.bind(this);
  this.emit = this.emit.bind(this);
};

Button.prototype.press = function press() {
  this.startInterval();
};
Button.prototype.pressOnce = function press() {
  this.emit('pressed');
}

Button.prototype.release = function release() {
  this.stopInterval();
};

Button.prototype.startInterval = function startInterval() {
  var self = this;
  if (!this.interval) {
    this.interval = setInterval(function() {
      self.emit('pressed');  
    }, this.repeatRate);
  }
};

Button.prototype.stopInterval = function() {
  clearInterval(this.interval);
  this.interval = null;
};

Button.prototype.emit = function emit() {
  this.cord.emit('button:'+this.name+':pressed');
};

module.exports = Button
