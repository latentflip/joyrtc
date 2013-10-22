var Channel = require('./channel.js')
var $ = require('jquery-browserify')
window.$ = $;

var log = require('bows')('GameServer')

var channel = new Channel({
  roomName: 'foo'
});


var keyUpTimeout = 100;
var keysDown = {};

function pressKey(key) {
  var keys = {
    left: [37, 65],       // a,     left
    right: [39, 68],      // d,     right
    up: [38, 87, 32],     // w,     up
    down: [40, 83],       // s,     down
    sprint: [16, 17],     // shift, ctrl
    pause: [80],          // p
  }

  var press = jQuery.Event("keydown");
  press.ctrlKey = false;
  press.which = press.keyCode = keys[key][0];

  $("body").trigger(press);
  
  clearTimeout( keysDown[key] )

  keysDown[key] = setTimeout(function() {
    var press = jQuery.Event("keyup");
    press.ctrlKey = false;
    press.which = press.keyCode = keys[key][0];
    $("body").trigger(press);
  }, keyUpTimeout);
}




window.pressKey = pressKey;

$(function() {
  channel.on('button:press', function(data) {
    pressKey(data.button)
  });
});
