require('angular'); // require and make 'angular' global

angular.module('app', []).controller('MainCtrl', function($scope) {
	$scope.msg = 'Hello from Angular';
});