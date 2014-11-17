
angular
    .module('resume')
    .controller('ResumeCtrl', function ($scope, $window, $state, resume, $stateParams) {
        $window.document.title = resume.basics.name + ' - Resume';

        var self = this;
        this.$stateParams = $stateParams;
        this.filter = this.$stateParams.filter;

        _.forEach(resume, function(value, key) {
            self[key] = value;
        });

        this.filter.isActive = function (keyword) {
            return self.filter.filter(function(value) {
                return keyword == value;
            }).length > 0;
        };

        this.goGithub = function() {
            $window.location = '//' + resume.basics.website;
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