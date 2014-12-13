define([
    'hbs!templates/forecast-day'
], function( DayForecastTemplate ) {
    return Backbone.View.extend({
        dayForecastTemplate: DayForecastTemplate,

        initialize: function() {
            return this;
        },

        render: function() {
            for ( var i = 0; i < 4; i++ ) {
                this.$el.append( this.dayForecastTemplate() );
            }
            console.log( this.$el );
            return this;
        }
    });
});