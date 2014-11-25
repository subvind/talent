
angular
    .module('resume', ['app-templates'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('resume', {
                url: '/',
                resolve: {
                    resume: function($http) {
                        return $http
                            .get('resume.json?' + Math.random()) // bust the cache every time
                            .then(function (res) {
                                return res.data;
                            });
                    }
                },
                views: {
                    'main': {
                        controller: 'ResumeCtrl as res',
                        templateUrl: 'states/resume/resume.html'
                    }
                }
            });
    });