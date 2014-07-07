angular.module('security')
    .factory('security.api', ['$http', 'security.urls', function ($http, Urls) {
        //Parameterize - Necessary for funky login expectations...
        var formdataHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };
        var parameterize = function (data) {
            var param = function (obj) {
                var query = '';
                var subValue, fullSubName, innerObj, i;
                angular.forEach(obj, function (value, name) {
                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        angular.forEach(value, function (subValue, subName) {
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        });
                    }
                    else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                });

                return query.length ? query.substr(0, query.length - 1) : query;
            };
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        };

        var Api = {
            getUserInfo: function (accessToken) {
                return $http({ url: Urls.userInfo, method: 'GET', headers: { 'Authorization': 'Bearer ' + accessToken } });
            },
            login: function (data) {
                return $http({ method: 'POST', url: Urls.login, data: parameterize(data), headers: formdataHeader });
            },
            logout: function () {
                return $http({ method: 'POST', url: Urls.logout });
            },
            register: function (data) {
                return $http({ method: 'POST', url: Urls.join, data: data });
            },
            forgotPassword: function (data) {
                return $http({ method: 'POST', url: Urls.forgotPassword, data: data });
            },
            resetPassword: function (data) {
                return $http({ method: 'POST', url: Urls.resetPassword, data: data });
            },
            confirmEmail: function (data) {
                return $http({ method: 'GET', url: Urls.confirmEmail+'?code='+encodeURIComponent(data.code)+'&userId='+encodeURIComponent(data.userId) });
            },
            changePassword: function (data) {
                return $http({ method: 'POST', url: Urls.changePassword, data: data });
            },
            getExternalLogins: function () {
                return $http({ method: 'GET', url: Urls.externalLogins + '?returnUrl=' + encodeURIComponent(Urls.site)+'&generateState=true', isArray: true });
            },
            manageInfo: function () {
                return $http({ method: 'GET', url: Urls.manageInfo + '?returnUrl=' + encodeURIComponent(Urls.site)+'&generateState=false' });
            },
            registerExternal: function (accessToken, data) {
                return $http({ method: 'POST', url: Urls.registerExternal, data: data, headers: { 'Authorization': 'Bearer ' + accessToken } });
            },
            addExternalLogin: function (accessToken, externalAccessToken) {
                return $http({ method: 'POST', url: Urls.addExternalLogin, data: { externalAccessToken: externalAccessToken }, headers: { 'Authorization': 'Bearer ' + accessToken } });
            },
            removeLogin: function (data) {
                return $http({ method: 'POST', url: Urls.removeLogin, data: data });
            }
        };

        return Api;
    }]);
