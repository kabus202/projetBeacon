'use strict'
app.controller('AccueilController', ['$scope', '$rootScope', '$ionicSideMenuDelegate',
    function($scope, $rootScope, $ionicSideMenuDelegate) {

    	var vm = this;
    	
        vm.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }

    }
])
