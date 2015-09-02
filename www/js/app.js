// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngAnimate', 'ngResource']);

app.run(['$ionicPlatform', function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

}]);

app.config(function($stateProvider, $urlRouterProvider, $animateProvider, $ionicConfigProvider) {

    $stateProvider

        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu/menu.html",
        controller: 'MenuController as menu'
    })

    .state('app.accueil', {
        url: "/accueil",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/pages/accueil.html",
                controller: 'AccueilController as accueil'
            }
        }
    })

    .state('app.scenario', {
        url: "/scenario/:param",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/pages/accueil.html",
                controller: 'ScenarioController as accueil'
            }
        }
    })

    .state('app.produit', {
        url: "/produit/:param",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/pages/produit.html",
                controller: 'ProduitController as produit'
            }
        }
    })

    .state('app.telecommande', {
        url: "/telecommande",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/pages/telecommande.html",
                controller: 'TelecommandeController as telecommande'
            }
        }
    })

    .state('app.parametres', {
        url: "/parametres",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/pages/parametres.html",
                controller: 'ParametresController as parametres'
            }
        }
    })

    .state('app.apropos', {
        url: "/apropos",
        cache: false,
        views: {
            'menuContent': {
                templateUrl: "templates/pages/apropos.html",
                controller: 'AproposController as apropos'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/accueil');

    // disable animation 
    $animateProvider.classNameFilter(/ng-animate-enabled/);

    // Custom navigation, donc pour éviter les bug, PAS DE CACHE.
    //$ionicConfigProvider.views.maxCache(0);

    $ionicConfigProvider.tabs.position('bottom');
});

app.constant('SETTINGS_API', {
    url: '',
    path: 'mocks'
});

var beacon = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        beacon.receivedEvent('deviceready');
    },
    // Log on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
beacon.initialize();
