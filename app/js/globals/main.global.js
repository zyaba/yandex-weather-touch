define([
    'configs/main.config'
], function( mainConfig ) {
    return {
        router: null,

        currentCityId: mainConfig.DEFAULT_CITY_GEOID,
        currentCityName: mainConfig.DEFAULT_CITY_NAME
    }
});