'use strict';
app.factory('IBeacons', ['SETTINGS_API', '$resource', '$q',
    function(SETTINGS_API, $resource, $q) {

        var resourceName = '/beacons.json';
        var res = $resource(SETTINGS_API.url + SETTINGS_API.path + resourceName);
        this.beacons = [];

        return {

            getIBeacons: function() {
                this.beacons = res.query();
                return this.beacons;
            },

            getBeacon: function(Id) {
                var dfd = $q.defer();

                angular.forEach(this.beacons, function(beacon) {
                    if (beacon.id == Id) {
                        dfd.resolve(beacon);
                    }
                });

                return dfd.promise;
            }

        };

    }
]);
