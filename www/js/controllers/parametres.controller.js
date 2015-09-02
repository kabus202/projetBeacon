'use strict'
app.controller('ParametresController', ['$scope', '$ionicSideMenuDelegate',
    'IBeacons', 'ScenarioService', 'LocalStorageService',
    function($scope, $ionicSideMenuDelegate,
        IBeacons, ScenarioService, LocalStorageService) {

        var vm = this;

        vm.scenarios = function() {
            var _scenarios = LocalStorageService.getScenarios();
            if (_scenarios) {
                return vm.scenarios = _scenarios;
            } else {
                LocalStorageService.setScenarios()
                .success(function() {
                    _scenarios = LocalStorageService.getScenarios();
                    return vm.scenarios = _scenarios;
                });
            }
        }();

        vm.beacons = function() {
            var _beacons = LocalStorageService.getBeacons();
            if (_beacons) {
                return vm.beacons = _beacons;
            } else {
                LocalStorageService.setBeacons()
                .success(function() {
                    _beacons = LocalStorageService.getBeacons();
                    return vm.beacons = _beacons;
                });
            }
        }();

        vm.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        vm.saveBeacons = function(obj) {
            LocalStorageService.setBeacons(obj);
        };

        vm.saveScenarios = function(obj) {
            LocalStorageService.setScenarios(obj);
        };

        vm.videCache = function() {
            localStorage.removeItem("scenarios");
            localStorage.removeItem("beacons");
        };

    }
])