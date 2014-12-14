define([
    'backbone',
    'hbs!templates/layout/layout',
    'views/forecast.view',
    'views/tabs.view'
], function( Backbone, LayoutTemplate, ForecastView, TabsView ) {
    return Backbone.View.extend({
        template: LayoutTemplate,

        initialize: function() {
            return this;
        },

        render: function() {
            this.setElement( this.template() );
            $('body' ).html( this.el );

            this._initTabs();
            this._renderForecastView();

            return this;
        },

        _initTabs: function() {
            this.$tabsView = new TabsView();
        },

        _renderForecastView: function() {
            this.$forecastView = new ForecastView().render();
        }
    });
});