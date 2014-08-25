
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
    .run(function ($state) {
        $state.go('resume');
    });