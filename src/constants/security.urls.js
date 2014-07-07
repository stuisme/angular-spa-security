angular.module('security')
    .constant('security.urls', {
        site: '/',
        manage: '/manage',
        join: '/api/account/register',
        login: '/token',
        logout: '/api/account/logout',
        forgotPassword: '/api/account/forgotpassword',
        resetPassword: '/api/account/resetpassword',
        confirmEmail: '/api/account/confirmEmail',
        userInfo: '/api/account/userInfo',
        changePassword: '/api/account/changePassword',
        externalLogins: '/api/account/externalLogins',
        manageInfo: '/api/account/manageInfo',
        registerExternal: '/api/account/registerExternal',
        addExternalLogin: '/api/account/addExternalLogin',
        removeLogin: '/api/account/removeLogin'
    });