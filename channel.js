// var Channel = require('./channel.js')
// 
// var channel = new Channel({
//   roomName: 'foo'
// });
// 
// channel.on('button:press', function(data) {
//   console.log("We got a ", data, "button press");
// });
// 
// setInterval(function() {
//   channel.emit('button:press', { data: 'foo' })
// }, 500)

var bows = require('bows');

window.io = require('socket.io-client');
var SimpleWebRTC = require('simplewebrtc');

module.exports = function Channel(opts) {
  var log = bows('Channel')
  
  var roomName = opts.roomName;

  var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      ///localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      //remoteVideosEl: 'remoteVideos',
      // immediately ask for camera access
      autoRequestMedia: true
  });

  webrtc.on('readyToCall', function () {
      log('Ready to call');
      // you can name it anything
      webrtc.joinRoom(roomName);
  });

  var onCallbacks = {};
  var channel;

  var setupPeer = function(peer) {
    log("Add peer", peer);
    channel = peer.channels.unreliable

    channel.onmessage = function(event) {
      log('onmessage', event);
      var message = JSON.parse(event.data);
      var queue = onCallbacks[ message.name];

      if (!queue) return false

      onCallbacks[ message.name ].forEach(function(cb) {
        cb(message.data);
      });
    }
  };

  var killPeer = function(peer) {
    log('Lost peer', peer);
  }

  webrtc.webrtc.on('peerStreamAdded', setupPeer);
  webrtc.webrtc.on('peerStreamRemoved', killPeer);
  console.log("Bound to ", webrtc.webrtc);

  var on = function on(eventName, cb) {
    onCallbacks[eventName] = onCallbacks[eventName] || [];
    onCallbacks[eventName].push(cb);
  };

  var emit = function(eventName, data) {
    channel && channel.send(JSON.stringify({
      name: eventName,
      data: data
    }));
  };


  return { on: on, emit: emit };
}
