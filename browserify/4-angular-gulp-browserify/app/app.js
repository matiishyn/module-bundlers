require('angular'); // require and make 'angular' global

var MainCtrl = require('./controllers/MainCtrl')

angular.module('app', []).controller('MainCtrl', MainCtrl);