
angular
    .module('resume')
    .controller('ResumeCtrl', function ($scope, $window, $state, resume, $stateParams) {
        $window.document.title = 'Travis Burandt - Resume';

        var self = this;
        this.$stateParams = $stateParams;
        this.filter = this.$stateParams.filter;

        _.forEach(resume, function(value, key) {
            self[key] = value;
        });

        console.log(this);

        this.goGithub = function() {
            $window.location = 'http://travisburandt.github.io';
        };

        this.addOrRemove = function(array, value) {
            var index = array.indexOf(value);
            if (index === -1) {
                array.push(value);
            } else {
                array.splice(index, 1);
            }
            return array;
        };
    });