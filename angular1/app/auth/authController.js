angular.module('primeiraApp').controller('AuthCtrl', [
  '$scope',
  '$http',
  '$location',
  'auth',
  'msgs',
  AuthController
])

function AuthController($scope, $http, $location, auth, msgs) {
    const vm = this
    vm.loginMode = true

    vm.changeMode = () => vm.loginMode = !vm.loginMode

    vm.login = () => {
        auth.login(vm.user, () => {
            $location.path('/')
        })
    }

    vm.signup = () => {
        auth.signup(vm.user, () => {
            $location.path('/')
        })
    }

    vm.logout = () => {
        auth.logout(() => {
            $location.path('/login')
        })
    }

    auth.validateToken()
}
