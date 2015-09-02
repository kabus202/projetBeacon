'use strict'
app.factory('LocalStorageService', ['$http',
    function($http) {

        var factory = {
            setBeacons: setBeacons,
            getBeacons: getBeacons,
            setScenarios: setScenarios,
            getScenarios: getScenarios,
        };
        return factory;

        function getBeacons() {
            var beacons_json = localStorage.getItem('beacons');
            var beacons = beacons_json != null ? JSON.parse(beacons_json) : false;
            return beacons;
        };

        function getScenarios() {
            var scenarios_json = localStorage.getItem('scenarios');
            var scenarios = scenarios_json != null ? JSON.parse(scenarios_json) : false;
            return scenarios;
        };

        function setBeacons(obj) {
            if (obj == null || obj == undefined) {
                return $http({
                    method: 'GET',
                    url: '../mocks/beacons.json'
                })
                .success(function(beacons_config, status, headers, config) {
                    localStorage.setItem('beacons', JSON.stringify(beacons_config));
                });
            } else {
                var beacons_json = localStorage.getItem('beacons');
                var beacons = beacons_json != null ? JSON.parse(beacons_json) : false; 
                for (var key in beacons) {
                    if (beacons[key]["id"] == obj.id) {
                        beacons[key]["name"] = obj.name;
                        beacons[key]["UUID"] = obj.UUID;
                        beacons[key]["major"] = obj.major;
                        beacons[key]["minor"] = obj.minor;
                        beacons[key]["color"] = obj.color;
                    }
                }
                localStorage.setItem('beacons', JSON.stringify(beacons));
            }
        };

        function setScenarios(obj) {
            if (obj == null || obj == undefined) {
                return $http({
                    method: 'GET',
                    url: '../mocks/scenarios.json'
                })
                .success(function(scenarios_config, status, headers, config) {
                    localStorage.setItem('scenarios', JSON.stringify(scenarios_config));
                });
            } else {
                var scenarios_json = localStorage.getItem('scenarios');
                var scenarios = scenarios_json != null ? JSON.parse(scenarios_json) : false;
                for (var key in scenarios) {
                    if (scenarios[key]["scenario"] == obj.scenario) {
                        for (var elem in scenarios[key]["beacon"]) {
                            if (scenarios[key]["beacon"][elem]["id"] == obj.mybeacon.id) {
                                scenarios[key]["beacon"][elem] = obj.mybeacon;
                                break;
                            }
                        }
                    }
                }
                localStorage.setItem('scenarios', JSON.stringify(scenarios));
            }
        };

    }
])
