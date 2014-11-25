
angular
    .module('app', [
        // vendors
        'ngAnimate',
        'ui.router',
        'mgcrea.ngStrap',
        'angularSpinner',
        // components
        'components',
        // states
        'resume'
    ])
    .config(function ($locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });