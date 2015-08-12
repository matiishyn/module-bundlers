var $ = require('jquery');

// write some jquery
var btn = $('<button/>').html('click me').on('click', function() {
	alert('hello1');
});
$('body').append(btn);