define([
    'hbs/handlebars',
    'configs/colours.config'
], function( Handlebars, coloursConfig ) {
    Handlebars.default.registerHelper('getBackgroundColor', function( temp ) {
        return coloursConfig[ temp ] || '#000';
    });

    Handlebars.default.registerHelper('formatTemp', function( temp ) {
        return ( temp > 0 ? '+' + temp : temp );
    });

    Handlebars.default.registerHelper('capitalize', function( str ) {
        return _.capitalize( str );
    });
});
