var Channel = require('./channel.js')
var $ = require('jquery-browserify')
window.$ = $;

var channel = new Channel({
  roomName: 'foo'
});


$(function() {
  var $ball = $('.ball');

  channel.on('button:press', function(data) {
    if (data.button == "up")
      $ball.css({ top: -10 + parseInt($ball.css('top'), 10) })

    if (data.button == "down")
      $ball.css({ top: 10 + parseInt($ball.css('top'), 10) })

    if (data.button == "left")
      $ball.css({ left: -10 + parseInt($ball.css('left'), 10) })

    if (data.button == "right")
      $ball.css({ left: 10 + parseInt($ball.css('left'), 10) })

    console.log("We got a ", data, "button press for ");
  });
});
