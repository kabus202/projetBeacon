'use strict'
app.factory('ScenarioService', ['SETTINGS_API', '$resource',
    function(SETTINGS_API, $resource) {

        var resourceName = '/scenarios.json';
        
        return $resource(SETTINGS_API.url + SETTINGS_API.path + resourceName).query();

    }
])
