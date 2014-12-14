define([
    'backbone',
    'hbs!templates/layout/layout',
    'views/forecast.view'
], function( Backbone, LayoutTemplate, ForecastView ) {
    return Backbone.View.extend({
        template: LayoutTemplate,

        initialize: function() {
            return this;
        },

        render: function() {
            this.setElement( this.template() );

            this._renderForecastView();

            return this;
        },

        _renderForecastView: function() {
            this.$forecastView = new ForecastView();
            this.$el.find('.forecast').replaceWith( this.$forecastView.render().el );
        }
    });
});