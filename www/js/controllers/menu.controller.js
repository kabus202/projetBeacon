'use strict'
app.controller('MenuController', ['$scope', 'BeaconMonitoringService',
    function($scope, BeaconMonitoringService) {

        var vm = this;

        BeaconMonitoringService.startScan();

        vm.alterScenario = function(id) {
        	console.log("modif du scenar : "+id);
        	BeaconMonitoringService.alterScenario(id);
        }

    }
]);
