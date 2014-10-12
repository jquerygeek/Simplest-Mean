angular.module('MyAngularApp', ['ngAnimate', 'ui.bootstrap', 'ngRoute'])

	/**
	 *
	 * All the angular routes will go here. Some of my routes are handled by angular
	 * application and some are handled by nodejs server
	 *
	 */

	.config(function ($routeProvider) {


	    $routeProvider.

	    when('/', {
	        templateUrl: '/welcomescreen',
	        controller: 'WelcomeScreenController'
	    })





	    /**
	     *
	     * You can remove this if you want.
	     *
	     */

	    .when('/:userprofile', {
			templateUrl: function(params){ return '/getuserview/'+ params.userprofile},
			controller: 'UserViewController'
		});


		

	})

	
	/**
	 *
	 * Socket.io is used as an Angular Service
	 *
	 */

	.factory('socket', function($rootScope) {
		var socket = io.connect();
		return {
			on: function(eventName, callback) {
				socket.on(eventName, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						callback.apply(socket, args);
					});
				});
			},
			emit: function(eventName, data, callback) {
				socket.emit(eventName, data, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						if(callback) {
						callback.apply(socket, args);
						}
					});
				});
			}
		};
	})
	
	
	/**
	 *
	 * I found this directive on Internet (some stackoverflow discussion).
	 * 
	 * This is a confirmation alert given to a user
	 *
	 */

	
	.directive('ngConfirmClick', [ function(){
		return {
		  priority: -1,
		  restrict: 'A',
		  link: function(scope, element, attrs){
			element.bind('click', function(e){
			  var message = attrs.ngConfirmClick;
			  if(message && !confirm(message)){
				e.stopImmediatePropagation();
				e.preventDefault();
			  }
			});
		  }
		}
	  }
	])


	/**
	 *
	 * I found this directive on Internet (some stackoverflow discussion).
	 * 
	 * This is used in when user fills the form. It is for validation.
	 * I will explain it in future. You can remove this.
	 *
	 */

	
	.directive('ngFocus', [function() {
		  var FOCUS_CLASS = "ng-focused";
		  return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
			  ctrl.$focused = false;
			  element.bind('focus', function(evt) {
				element.addClass(FOCUS_CLASS);
				scope.$apply(function() {ctrl.$focused = true;});
			  }).bind('blur', function(evt) {
				element.removeClass(FOCUS_CLASS);
				scope.$apply(function() {ctrl.$focused = false;});
			  });
			}
		  }
		}]);