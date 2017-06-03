angular.module('primeiraApp').config([
	'$stateProvider',
	'$urlRouterProvider',
	'$httpProvider',
	function ($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider.state('dashboard', {
			url: "/dashboard",
			templateUrl: "dashboard/dashboard.html"
		}).state('billingCycle', {
			url: "/billingCycles?page",
			templateUrl: "billingCycle/tabs.html"
		}).state('login', {
			url: "/login",
			templateUrl: "auth/form.html"
		})
	
		$httpProvider.interceptors.push('handleResponseError')
	}])
	.run([
		'$rootScope',
		'$http',
		'$location',
		'$window',
		'auth',
		function ($rootScope, $http, $location, $window, auth) {
			validateUser()
			$rootScope.$on('$locationChangeStart', () => validateUser())

			function validateUser() {
				const user = auth.getUser()
				const isLoginPage = $window.location.href.endsWith('login.html')
				
				if (!user && !isLoginPage) {
					$window.location.href = '/login.html'
				} else if (user && !user.isValid) {
					auth.validateToken(user.token, (err, valid) => {
						if (!valid) {
							$window.location.href = '/login.html'
						} else {
							user.isValid = true
							$http.defaults.headers.common.Authorization = user.token
							isLoginPage ? $window.location.href = '/' : $location.path('/dashboard')
						}
					})
				}
			}
		}
	])
