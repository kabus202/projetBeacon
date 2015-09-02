'use strict'
app.controller('ScenarioController', ['$scope', '$ionicSideMenuDelegate','BeaconMonitoringService', 
    function($scope, $ionicSideMenuDelegate, BeaconMonitoringService) {

    	var vm = this;
    	
        vm.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }
    }
])
