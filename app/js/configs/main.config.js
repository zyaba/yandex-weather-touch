define([
    'configs/urls.config',
    'configs/colours.config',
    'configs/formats.config'
], function( urlsConfig, coloursConfig, formatsConfig ) {
    return {
        urlsConfig: urlsConfig,
        coloursConfig: coloursConfig,
        formatsConfig: formatsConfig,

        VISUAL_GRAPH_MIN_HEIGHT: 100,
        VISUAL_GRAPH_MAX_HEIGHT: 400
    };
});