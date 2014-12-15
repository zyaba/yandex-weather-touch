define([
    'backbone',
    'routers/main.router',
    'globals/main.global',
    'hbs!templates/container/container',
    'views/forecast.view',
    'views/search.view',
    'views/tabs.view'
], function( Backbone, MainRouter, Global, ContainerTemplate, ForecastView, SearchView, TabsView ) {
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

            Global.router = new MainRouter();
            Backbone.history.start();

            Global.router.navigate( '54', { trigger: true });

            return this;
        },

        _initTabs: function() {
            this.$tabsView = new TabsView().render();
        },

        _initSearchView: function() {
            this.$searchView = new SearchView().render();
        },

        _renderForecastView: function() {
            this.$forecastView = new ForecastView().render();
        }
    });
});