function Analog(opts) {
  this.cord = opts.cord;
  this.name = opts.name;
  this.repeatRate = opts.repeatRate || 100;
  this.move = this.move.bind(this);
}

Analog.prototype.on = function on(position) {
  this.position = { x: 0, y: 0 };
  this.startInterval();
}

Analog.prototype.move = function move(x,y) {
  this.position.x = x;
  this.position.y = y;
}

Analog.prototype.off = function off() {
  this.stopInterval();
}

Analog.prototype.startInterval = function startInterval() {
  var self = this;
  if (!this.interval) {
    this.interval = setInterval(function() {
      console.log(self.position);
      self.emit('moved', self.position);  
    }, this.repeatRate);
  }
};

Analog.prototype.stopInterval = function() {
  clearInterval(this.interval);
  this.interval = null;
};

Analog.prototype.emit = function emit(action, data) {
  this.cord.emit('analog:'+this.name+':moved', data);
};

module.exports = Analog;
