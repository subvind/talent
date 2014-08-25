
angular
    .module('resume')
    .controller('ResumeCtrl', function ($scope, $window, $state, resume) {
        $window.document.title = 'Travis Burandt - Resume';

        var self = this;

        _.forEach(resume, function(value, key) {
            self[key] = value;
        });
        console.log(this);

        this.goGithub = function() {
            $window.location = 'http://travisburandt.github.io';
        };
    });