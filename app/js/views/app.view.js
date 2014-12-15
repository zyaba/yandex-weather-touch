define([
    'backbone',
    'hbs!templates/container/container',
    'views/forecast.view',
    'views/search.view',
    'views/tabs.view'
], function( Backbone, ContainerTemplate, ForecastView, SearchView, TabsView ) {
    return Backbone.View.extend({
        template: ContainerTemplate,

        initialize: function() {
            return this;
        },

        render: function() {
            this.setElement( this.template() );
            $('body' ).html( this.el );

            this._initTabs();
            this._initSearchView();
            this._renderForecastView();

            return this;
        },

        _initTabs: function() {
            this.$tabsView = new TabsView();
        },

        _initSearchView: function() {
            this.$searchView = new SearchView();
        },

        _renderForecastView: function() {
            this.$forecastView = new ForecastView().render();
        }
    });
});