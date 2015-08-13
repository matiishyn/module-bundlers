require('angular');

var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
	$scope.msg = 'Hello from Angular';
});