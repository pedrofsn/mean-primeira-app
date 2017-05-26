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
                if(callback) callback(resp.data)
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
            })
    } 

    function logout(callback) {
        localStorage.removeItem(userKey)
        $http.defaults.headers.common.Authorization = ''
        if(callback) callback()
    }

    function validateToken(callback) {
        const token = getUser() ? getUser().token : null
        if(token) {
            $http.post(`${consts.oapiUrl}/validateToken`, { token })
                .then(resp => {
                    if(!resp.data.valid) {
                        logout()
                    } else {
                        $http.defaults.headers.common.Authorization = getUser().token
                        if(callback) callback()
                    }
                }).catch(function(resp) {
                    msgs.addError(resp.data.errors)
                })
        }
    }

    function getUser() {
        return JSON.parse(localStorage.getItem(userKey))
    }

    return { signup, login, logout, validateToken, getUser }
}
