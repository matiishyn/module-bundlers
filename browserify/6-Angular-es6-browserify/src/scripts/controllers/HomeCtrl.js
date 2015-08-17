export default function($scope, PersonService) {
	PersonService.getPerson().promise.then(function(person) {
		debugger;
		$scope.person = person;
	});
}