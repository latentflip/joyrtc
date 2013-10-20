var Channel = require('./channel.js');
var $ = require('jquery-browserify');
var bows = require('bows');
var fastclick = require('fastclick');

var log = bows('Gamepad');

var channel = new Channel({
  roomName: 'foo'
});

// setInterval(function() {
// 	channel.emit('button:press', {button: 'up'});
// }, 100);

$('document').ready(function() {
	fastclick(document.body);

	$('#up').click(function() {
		channel.emit('button:press', {button: 'up'});
		log('up button')
	});
	$('#down').click(function() {
		channel.emit('button:press', {button: 'down'});
		log('down button')
	});
	$('#left').click(function() {
		channel.emit('button:press', {button: 'left'});
		log('left button')
	});
	$('#right').click(function() {
		channel.emit('button:press', {button: 'right'});
		log('right button')
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