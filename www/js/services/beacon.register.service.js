'use strict'
app.factory('BeaconRegisterService', [
    function() {

        var beaconDetected = [];
        var timer;

        var factory = {
            registerBeacon: registerBeacon,
            getRegisterBeacons: getRegisterBeacons,
            getBeaconToDisplay: getBeaconToDisplay,
        };
        return factory;

        function registerBeacon(obj) {
            beaconDetected = obj;
            console.log("BEACON REGISTERED : " + JSON.stringify(beaconDetected));
        };

        function getRegisterBeacons() {
            return beaconDetected;
        };

        /* Renvoi le beacon à afficher selon le rssi */
        function getBeaconToDisplay(beacon) {
            var currentBeacon;
            var beaconDisplay;
            currentBeacon = beaconDetected[0];            
            for (var i = 0; i < beaconDetected.length; i++) {
                beaconDisplay = beaconDetected[i].rssi > currentBeacon.rssi ? beaconDetected[i] : currentBeacon;
            }
            return beaconDisplay;
        };

    }
])
