
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
    .config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    })
    .run(function ($state) {
        $state.go('resume');
    });