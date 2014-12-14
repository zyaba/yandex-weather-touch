define([
    'hbs/handlebars',
    'configs/colours.config'
], function( Handlebars, coloursConfig ) {
    console.log( Handlebars );
    Handlebars.default.registerHelper('getBackgroundColor', function( temp ) {
        return coloursConfig[ temp ] || '#000';
    });
});
