var Channel = require('./channel.js');
var $ = require('jquery-browserify');
var bows = require('bows');
var fastclick = require('fastclick');

var log = bows('Gamepad');

var channel = new Channel({
  roomName: 'foo'
});

var up, down, left, right;


$('document').ready(function() {
	fastclick(document.body);

	setInterval(function() {
		if (up) channel.emit('button:press', {button: 'up'});
		if (down) channel.emit('button:press', {button: 'down'});
		if (left) channel.emit('button:press', {button: 'left'});
		if (right) channel.emit('button:press', {button: 'right'});
	}, 25)

	$('#up').on('touchstart', function() {
		up = true
	}).bind('touchend', function() {
	    up = false
	});


	$('#down').on('touchstart', function() {
		down = true
	}).bind('touchend', function() {
	    down = false
	});

	$('#left').on('touchstart', function() {
	    left = true
	}).bind('touchend', function() {
	    left = false
	});

	$('#right').on('touchstart', function() {
	    right = true
	}).bind('touchend', function() {
	    right = false
	});

	$('#a').click(function() {
		channel.emit('button:press', {button: 'A'});
		log('A button')
	});
	$('#b').click(function() {
		channel.emit('button:press', {button: 'B'});
		log('B button')
	});
});