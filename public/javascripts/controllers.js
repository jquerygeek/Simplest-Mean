function WelcomeScreenController ($scope, $http, socket, $timeout){

	/**
	 *
	 * Write your logic here. You can remove $http, socket, and $timeout if
	 * you don't need them
	 *
	 */

}

function UserViewController ($scope, $http, socket, $timeout){

	/**
	 *
	 * Write your logic here. You can remove $http, socket, and $timeout if
	 * you don't need them
	 *
	 */

}

function LoginRegister ($scope, $http, $window){
	
		$scope.alerts = [];

		$scope.addAlert = function(newtype, newMsg) {
			console.log('Error', newtype, newMsg)
			$scope.alerts.push({type: newtype, msg: newMsg});
		};

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.alertsRegister = [];

		$scope.addAlertRegister = function(newtype, newMsg) {
			console.log('Error', newtype, newMsg)
			$scope.alertsRegister.push({type: newtype, msg: newMsg});
		};

		$scope.closeAlertRegister = function(index) {
			$scope.alertsRegister.splice(index, 1);
		};
		
		$scope.master = {};
		 
		$scope.update = function(user) {
		$scope.master = angular.copy(user);
		};
		 
		$scope.reset = function() {
		$scope.user = angular.copy($scope.master);
		};
		 
		$scope.isUnchanged = function(user) {
		return angular.equals(user, $scope.master);
		};
		 
		$scope.reset();
		
		$scope.underProgress = function(){
			return $scope.progressState;
		}
		
		$scope.loginForm = function() {
			
			$scope.progressState = true;
			
			$http.post('/login', JSON.stringify($scope.user1))
			.error(function(data) {
				$scope.progressState = false;
				$scope.addAlert('danger', 'Invalid username or password')
			})
			.success(function(data) {
				$scope.progressState = false;
				$window.location.href = '/home';
			});
			
		};
		
		$scope.registerForm = function() {
			
			$scope.progressState = true;
			
			$http.post('/register', JSON.stringify($scope.user))
			.success(function(data) {
				$scope.progressState = false;
				if(data.status != 'success')
					$scope.addAlertRegister(data.status, data.msg)
				else
					$window.location.href = '/home';
			})
			.error(function(data) {
				$scope.progressState = false;
				$scope.addAlertRegister(data, data)
			});
			
		};
		
}
