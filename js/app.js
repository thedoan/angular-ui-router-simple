angular.module("app", ['ui.router']).
	config(function($stateProvider){
		$stateProvider.state('contacts', {
			templateUrl: 'templates/contact.html',
			resolve: {
				// Example using function with simple return value.
				// Since it's not a promise, it resolves immediately.
				simpleObj:  function(){
					return {value: 'simple!'};
				},
				// Example using function with returned promise.
				// This is the typical use case of resolve.
				// You need to inject any services that you are
				// using, e.g. $http in this example
				promiseObj:  function($http){
					// $http returns a promise for the url data
					return $http({method: 'GET', url: 'assets/contacts.json'});
				}		
			},
			// The controller waits for every one of the above items to be
			// completely resolved before instantiation. For example, the
			// controller will not instantiate until promiseObj's promise has 
			// been resolved. Then those objects are injected into the controller
			// and available for use.  
			controller: function($scope, $state, simpleObj, promiseObj) {
				$scope.title = "My Contacts";
				$scope.simple = simpleObj.value;
				$scope.contacts = promiseObj.data;
				//get custom data
				$scope.customData1 = $state.current.data.customData1; 
				$scope.customData2 = $state.current.data.customData2; 
			},
			//Custom data to state object
			data: {
				customData1: 5,
				customData2: "blue"
			}  
		}).state('contacts.list', {
			templateUrl: 'templates/contact-list.html',
			controller: function($scope) {
				$scope.title = "Contact list";
			}
		}).state('contacts.list.contactdetail', {
			url: ":contactName",
			templateUrl: 'templates/contact-detail.html',
			controller: function($scope, $stateParams) {
				var contactName = $stateParams.contactName;
				$scope.title = "Contact Detail";
				$scope.contact = $scope.contacts.find(function(contact) {
					return contact.name === contactName;	
				});
			}
		});
		$stateProvider.state('home', {
			template: '<h1>Home Page</h1>'
		});
		$stateProvider.state('about', {
			template: '<h1>About page</h1>'
		});

	}).
	controller("MainCtrl", ['$scope', MainCtrl]);
function MainCtrl($scope) {

}
