angular.module('primeiraApp').factory('auth', [
    '$http',
    'msgs',
    'consts',
    AuthFactory
])


function AuthFactory($http, msgs, consts) {

    const userKey = '_primeira_app_user'

    function signup(user, callback) {
        submit('signup', user, callback)
    }

    function login(user, callback) {
        submit('login', user, callback)
    }

    function submit(url, user, callback) {
        $http.post(`${consts.oapiUrl}/${url}`, user)
            .then(resp => {
                localStorage.setItem(userKey, JSON.stringify(resp.data))
                $http.defaults.headers.common.Authorization = resp.data.token
                if(callback) callback()
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
            })
    } 

    function logout() {
        localStorage.removeItem(userKey)
        $http.defaults.headers.common.Authorization = ''
    }

    function validateToken(callback) {
        $http.post(`${consts.oapiUrl}/validateToken`)
            .then(resp => {
                if(!resp.token) {
                    logout()
                } else {
                    const currentUser = JSON.parse(localStorage.getItem(userKey))
                    $http.defaults.headers.common.Authorization = currentUser.token
                    if(callback) callback()
                }
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
            })
    }

    return { signup, login, logout, validateToken }
}
