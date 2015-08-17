(function () {

	var pb = angular.module('phoneBook', ['ui.router']);
	/*pb.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: '/partials/list.html',
				resolve: {
					contacts: function(contactService) {
						return contactService.getAll();
					}
				}
			});

	}]);*/

	pb.controller('MainController', ['contactService', function (contactService) {

		//this.contacts = contactService.getAll();

		this.contact = {};

		this.onSubmit = function () {
			contactService.add(this.contact);
		};

	}]);

	pb.service('contactService', ['$http', function($http){

		this.add = function(contact){

			return $http({
				url: '/contact',
				method: 'POST',
				data: contact
			});

		};

		this.getAll = function(){

			return $http({
				url: '/contact',
				method: 'GET'
			});

		};

	}]);

	pb.filter('formatPhone', function(){

		return function(input){
			return input.splice(0,3) + '(' + input.splice(3,6) + ')' + input.splice(6,10);
		}

	});

})();