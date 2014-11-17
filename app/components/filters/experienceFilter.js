angular
    .module('components')
    .filter('experienceFilter', function() {
        return function(items, filter) {

            if (_.isArray(filter) && filter.length) {
                var results = _.clone(items);

                filter.forEach(function (value) {
                    var index = -1;
                    var filterKeyword = function (keyword) {
                        return keyword == value;
                    };

                    while (++index < results.length) {
                        if (!results[index].keywords.filter(filterKeyword).length) {
                            results.splice(index, 1);
                            index--;
                        }
                    }
                });
                return results;

            } else {
                return items;
            }
        };
    });