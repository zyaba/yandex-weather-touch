define([
    'backbone'
], function(
    Backbone
) {
    return Backbone.Router.extend({
        initialize: function() {},

        routes: {
            '': 'defaultRoute',
            ':geoid': 'onCityChange'
        },

        onCityChange: function( geoid ) {
            console.log('city id', geoid);
            Backbone.trigger('city:change', geoid);
        }
    });
});