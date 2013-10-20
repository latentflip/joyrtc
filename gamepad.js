var Channel = require('./channel.js');
var $ = require('jquery-browserify');

var channel = new Channel({
  roomName: 'foo'
});

$('document').ready(function() {
	$('#up').click(function() {
		channel.emit('button:press', {button: 'up'});
	});
	$('#down').click(function() {
		channel.emit('button:press', {button: 'down'});
	});
	$('#left').click(function() {
		channel.emit('button:press', {button: 'left'});
	});
	$('#right').click(function() {
		channel.emit('button:press', {button: 'right'});
	});
	$('#a').click(function() {
		channel.emit('button:press', {button: 'A'});
	});
	$('#b').click(function() {
		channel.emit('button:press', {button: 'B'});
	});
});