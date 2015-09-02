'use strict'
app.factory('ActionService', ['ScenarioService',
    function(ScenarioService) {

        var listBeacon;
        var idBeacon;
        var action;
        var produit;

        var factory = {
            beacon: beacon,
            doAction: doAction,
        };
        return factory;

        function doAction(beaconId, scenarioId) {

            var scenario = ScenarioService;

            for (var i = 0; i < scenario.length; i++) {
                if (scenario[i]["scenario"] == scenarioId) {
                    listBeacon = scenario[i]["beacon"];
                }
            }

            for (var i = 0; i < listBeacon.length; i++) {
                if (listBeacon[i]["id"] == beaconId) {
                    idBeacon = listBeacon[i]["id"];
                    action = listBeacon[i]["action"];
                    produit = listBeacon[i]["produit"];
                }
            }

            /* Forcer le retour à l'accueil permet de "bloquer" les vues */
            switch (action) {
                case "produit":
                    window.location.href = '#app/accueil';
                    window.location.href = '#app/produit/' + idBeacon;
                    break;
                case "tv":
                    window.location.href = '#app/accueil';
                    //Envoi de la trame avec le plugin BLE, utilisation d'un service
                    break;
                case "telecommande":
                    window.location.href = '#app/accueil';
                    window.location.href = '#app/telecommande';
                    break;
                case "promo":
                    window.location.href = '#app/accueil';
                    //window.location.href = '#app/promo/' + idBeacon;
                    break;
            }

        }


    }
])
