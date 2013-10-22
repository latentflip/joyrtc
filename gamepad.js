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

cord.on('button:*', function(event) {
  var button = event.split(':')[1];
  if (button === 'up') $ball.css({ top: parseInt($ball.css('top'), 10) - 1 });
  if (button === 'down') $ball.css({ top: parseInt($ball.css('top'), 10) + 1 });
  if (button === 'left') $ball.css({ left: parseInt($ball.css('left'), 10) - 1 });
  if (button === 'right') $ball.css({ left: parseInt($ball.css('left'), 10) + 1 });
})


AnalogView = require('./analog-view');
Analog = require('./analog');



cord.on('analog:*', function(event, data) {
  var stick = event.split(':')[1];
  $ball.css({ top: parseInt($ball.css('top'), 10) - 10*data.y });
  $ball.css({ left: parseInt($ball.css('left'), 10) + 10*data.x });
})


var analogView = new AnalogView({
  analog: new Analog({ cord: cord, name: 'direction' }),
  top: 90,
  left: 45,
  width: 118,
  height: 118
}).appendTo($('.nes-pad'));

//var dpadView = new DpadView({
//  buttons: {
//    up: new Button({ cord: cord, name: 'up' }),
//    down: new Button({ cord: cord, name: 'down' }),
//    left: new Button({ cord: cord, name: 'left' }),
//    right: new Button({ cord: cord, name: 'right' })
//  },
//  top: 90,
//  left: 45,
//  width: 118,
//  height: 118
//}).appendTo($('.nes-pad'));

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
