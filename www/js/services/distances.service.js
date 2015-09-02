'use strict'
app.factory('DistanceService', ['BeaconRegisterService', 'IBeacons',

    function(BeaconRegisterService, IBeacons) {

        var proximity;
        var rssi;
        var statusDecouvert;
        var result = null;

        var factory = {
            getDistance: getDistance,
        }
        return factory;

        function getDistance(idBeacon) {

            var beaconDetected = BeaconRegisterService.getRegisterBeacons();
            var beaconRegistered = IBeacons.getBeacon(idBeacon);
            var beaconRegisteredValue = beaconRegistered["$$state"]["value"];

            if (beaconDetected.length > 0) {
                for (var i = 0; i < beaconDetected.length; i++) {
                    if (beaconDetected[i]["minor"] == beaconRegisteredValue["minor"]) {
                        proximity = beaconDetected[i].proximity;
                        rssi = beaconDetected[i].rssi;
                    }
                }

                if (proximity == "ProximityFar") {
                    result = 3;
                    statusDecouvert = false;
                } else if (proximity == "ProximityNear" && !statusDecouvert) {
                    result = 2;
                } else if (proximity == "ProximityImmediate") {
                    result = 1;
                    statusDecouvert = true;
                }
            }
            return result;
        }

    }

])
