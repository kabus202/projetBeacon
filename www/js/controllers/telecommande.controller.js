'use strict'
app.controller('TelecommandeController', ['$scope', '$rootScope', '$ionicHistory',
    function($scope, $rootScope, $ionicHistory) {

        var vm = this;

        vm.myGoBack = function() {
            $ionicHistory.goBack();
        }

        function displayVideo(num) {

        }

    }
])

