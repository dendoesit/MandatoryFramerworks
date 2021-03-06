angular.module('app', ['ngResource', 'ngRoute']);
angular.module('app').config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
            admin: {
                auth: function (mvAuth) {
                    return mvAuth.authorizeCurrentUserForRoute('admin');
                }
            }
        };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'myMainCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'
        })
        .when('/admin/contents', {
            templateUrl: '/partials/admin/content-list',
            controller: 'mvContentListCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/tags', {
            templateUrl: '/partials/admin/tag-list',
            controller: 'mvTagListCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/categories', {
            templateUrl: '/partials/admin/category-list',
            controller: 'mvCategoryListCtrl',
            resolve: routeRoleChecks.admin
        });
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});