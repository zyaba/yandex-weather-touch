define([
    'configs/urls.config',
    'configs/colours.config',
    'configs/formats.config'
], function( urlsConfig, coloursConfig, formatsConfig ) {
    return {
        urlsConfig: urlsConfig,
        coloursConfig: coloursConfig,
        formatsConfig: formatsConfig,

        VISUAL_GRAPH_MIN_HEIGHT: 50,
        VISUAL_GRAPH_MAX_HEIGHT: 200,

        DEFAULT_CITY_GEOID: 213,
        DEFAULT_CITY_NAME: 'Москва'
    };
});