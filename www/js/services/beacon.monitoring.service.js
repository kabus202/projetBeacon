'use strict'
app.factory('BeaconMonitoringService', ['$rootScope', '$ionicSideMenuDelegate', 'IBeacons', 'ActionService', 'BeaconRegisterService',
    function($rootScope, $ionicSideMenuDelegate, IBeacons, ActionService, BeaconRegisterService){

        var factory = {
            startScan: startScan,
            alterScenario: alterScenario,
        };
        return factory;

        var lastbeacons = [];
        var beaconDetected = null;
        var scenario;

        function alterScenario(id) {
            scenario = id;
            beaconDetected = null;
        };

        function activateListeners() {
            var _beacon = null;
            var beaconRegions = [];
            for (var i = 0; i < IBeacons.beacons.length; i++) {
                _beacon = IBeacons.beacons[i];
                beaconRegions.push(new cordova.plugins.locationManager.BeaconRegion(_beacon.name, _beacon.UUID));
            }
            for (var i = 0; i < beaconRegions.length; i++) {
                var beacon = beaconRegions[i];
                cordova.plugins.locationManager.startMonitoringForRegion(beacon);
                cordova.plugins.locationManager.startRangingBeaconsInRegion(beacon);
            }
        };

        function getBeaconId(major, minor) {
            var _beaconID = null;
            var iterator = null;
            for (var i = 0; i < IBeacons.beacons.length; i++) {
                iterator = IBeacons.beacons[i];
                if (iterator.major == major && iterator.minor == minor) {
                    _beaconID = iterator.id;
                }
            }
            return _beaconID;
        };

        function checkRegionBeaconNew(beacons) {
            var _beacon = null;
            var newbeacons = [];
            var _beaconID = null;
            for (var i = 0; i < beacons.length; i++) {
                _beaconID = getBeaconId(beacons[i].major, beacons[i].minor);
                if (!lastbeacons[_beaconID])
                    doBeaconAction();
                newbeacons[_beaconID] = true;
            }
            lastbeacons = newbeacons;
        };

        function doBeaconAction() {
            var beaconToDisplay = BeaconRegisterService.getBeaconToDisplay(beaconToDisplay);
            var _beaconID = getBeaconId(beaconToDisplay.major, beaconToDisplay.minor);
            if (_beaconID != beaconDetected && scenario != 0) {
                beaconDetected = _beaconID;
                console.log("app controleur, ID beacon : " + _beaconID + ", ID scenario : " + scenario);
                ActionService.doAction(_beaconID, scenario);
            }
        };

        function startScan() {
            console.log("BeaconMonitoringService - start scan");
            scenario = 0;
            //Chargement des beacons par défaut
            IBeacons.getIBeacons();

            document.addEventListener('deviceready', function onDeviceReady() {

                var monitorDelegate = new cordova.plugins.locationManager.Delegate();

                monitorDelegate.didDetermineStateForRegion = function(pluginResult) {
                    console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
                    cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
                };

                monitorDelegate.didStartMonitoringForRegion = function(pluginResult) {
                    console.log('didStartMonitoringForRegion:', pluginResult);
                    console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
                };

                monitorDelegate.didRangeBeaconsInRegion = function(pluginResult) {
                    //console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
                    BeaconRegisterService.registerBeacon(pluginResult.beacons);
                    checkRegionBeaconNew(pluginResult.beacons);
                };

                monitorDelegate.didEnterRegion = function(pluginResult) {
                    //console.log('[DOM] didEnterRegion: ' + JSON.stringify(pluginResult));
                };

                monitorDelegate.didExitRegion = function(pluginResult) {
                    //console.log('[DOM] ExitRegion: ' + JSON.stringify(pluginResult));          
                };

                cordova.plugins.locationManager.enableDebugNotifications()

                cordova.plugins.locationManager.setDelegate(monitorDelegate);

                // required in iOS 8+
                cordova.plugins.locationManager.requestWhenInUseAuthorization();

                //IBeacons.initLocationManager.call(monitorDelegate);
                activateListeners();
            }, false);
        };

    }
])
