'use strict'
app.controller('ProduitController', ['$scope', '$rootScope','$stateParams','$ionicHistory', 'DistanceService', 'IBeacons',
    function($scope, $rootScope, $stateParams, $ionicHistory, DistanceService, IBeacons) {

        var vm = this;
        var timer;

        vm.myGoBack = function() {
            killProcess();
            $ionicHistory.goBack();
        };
        
        vm.classeFlou = flou();

        function flou() {
            var result;
            var distance = DistanceService.getDistance($stateParams.param);
            switch (distance) {
                case 1:
                    result = "";
                    console.log("Flou a zero");
                    break;
                case 2:
                    result = "flou3";
                    console.log("Flou a trois");
                    break;
                case 3:
                    result = "flou6";
                    console.log("Flou a six");
                    break;
            }
            return result;
        };

        timer = setInterval(function() {
            $scope.$apply(function() {
                vm.classeFlou = flou(); 
            })    
        }, 1000);

        function killProcess() {
            clearInterval(timer);
        };

    }
])
