
angular
    .module('resume')
    .controller('ResumeCtrl', function ($scope, $window, $state, resume, $stateParams) {
        $window.document.title = resume.general.name + ' - Resume';

        var that = this;
        this.$stateParams = $stateParams;
        this.filter = [];

        _.forEach(resume, function(value, key) {
            that[key] = value;
        });

        this.filter.isActive = function (keyword) {
            return that.filter.filter(function(value) {
                return keyword == value;
            }).length > 0;
        };

        this.goGithub = function() {
            $window.location = '//' + resume.general.website;
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

        $scope.$watch(
            function () {
                return that.filter.length;
            },
            function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    ga('send', 'event', {
                        'eventCategory': 'Resume',
                        'eventAction': 'Filter',
                        'eventValue': that.filter
                    });
                }
            }
        );
    });