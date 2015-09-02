'use strict'
app.controller('AproposController', ['$scope', '$ionicSideMenuDelegate',
    function($scope, $ionicSideMenuDelegate) {

        var vm = this;

        vm.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }
        
    }
])
