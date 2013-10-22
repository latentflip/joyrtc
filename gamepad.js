var Channel = require('./channel.js');
var $ = require('jquery-browserify');
var bows = require('bows');
var fastclick = require('fastclick');
var log = bows('Gamepad');
var WildEmitter = require('wildemitter');
window.$ = $;
var Button = require('./button');
var ButtonView = require('./button-view');
var DpadView = require('./dpad-view');

var cord = new WildEmitter();

var $ball = $('.ball');

cord.on("button:*", function(event) {
  var dir = event.split(':')[1];
  if (dir === 'up') $ball.css({ top: parseInt($ball.css('top'), 10) - 1 });
  if (dir === 'down') $ball.css({ top: parseInt($ball.css('top'), 10) + 1 });
  if (dir === 'left') $ball.css({ left: parseInt($ball.css('left'), 10) - 1 });
  if (dir === 'right') $ball.css({ left: parseInt($ball.css('left'), 10) + 1 });
})



var dpadView = new DpadView({
  buttons: {
    up: new Button({ cord: cord, name: 'up' }),
    down: new Button({ cord: cord, name: 'down' }),
    left: new Button({ cord: cord, name: 'left' }),
    right: new Button({ cord: cord, name: 'right' })
  },
  top: 90,
  left: 45,
  width: 118,
  height: 118
}).appendTo($('.nes-pad'));

var buttonView = new ButtonView({
  button: new Button({ cord: cord, name: 'a' }),
  width: 58,
  height: 58,
  top: 151,
  left: 401
}).appendTo($('.nes-pad'));

var buttonView = new ButtonView({
  button: new Button({ cord: cord, name: 'b' }),
  width: 58,
  height: 58,
  top: 151,
  left: 479
}).appendTo($('.nes-pad'));
