angular.module('primeiraApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
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

    $urlRouterProvider.otherwise('/dashboard')
}])
.run([
	'$rootScope',
	'$http',
	'$location',
	'auth',
	function($rootScope, $http, $location, auth) {
		$rootScope.hasUser = !!auth.getUser()
		
		const currentUser = auth.getUser()
		if(currentUser) {
			$http.defaults.headers.common.Authorization = currentUser.token
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			$rootScope.hasUser = !!auth.getUser()
			if(!auth.getUser()) {
				$location.path('/login')
			} else if($location.path() === '/login') {
				$location.path('/')
			}
		})
	}	
])
