var Channel = require('./channel.js')

var channel = new Channel({
  roomName: 'foo'
});

channel.on('button:press', function(data) {
  console.log("We got a ", data, "button press");
});
