var $ = require('jquery');

var button = $('<button/>').html('click me').on('click', function() {
	alert('from internal file');
});

module.exports = button;