define([
    'backbone',
    'routers/main.router',
    'globals/main.global',
    'configs/main.config',
    'hbs!templates/container/container',
    'views/forecast.view',
    'views/search.view',
    'views/tabs.view'
], function( Backbone, MainRouter, Global, mainConfig, ContainerTemplate, ForecastView, SearchView, TabsView ) {
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

            if ( !Global.currentCityId ) {
                this._getGeoLocation();
            }

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
        },

        _getGeoLocation: function() {
            if ( !navigator.geolocation ){
                this._onGetCurrentPosError();
                return;
            }

            navigator.geolocation.getCurrentPosition( this._onGetCurrentPosSuccess.bind( this ), this._onGetCurrentPosError, { timeout: 5000 } );
        },

        _onGetCurrentPosSuccess: function( position ) {
            var latitude  = position.coords.latitude,
                longitude = position.coords.longitude;

            $.ajax({
                url: mainConfig.urlsConfig.geocode.replace('{long}', longitude ).replace('{lat}', latitude),
                dataType: 'json',
                success: this._onGeoIdGetSuccess,
                error: this._onGetCurrentPosError
            });
        },

        _onGetCurrentPosError: function() {
            Global.currentCityName = mainConfig.DEFAULT_CITY_NAME;
            Global.currentCityId = mainConfig.DEFAULT_CITY_GEOID;

            Global.router.navigate( Global.currentCityId.toString(), { trigger: true } );
        },

        _onGeoIdGetSuccess: function( data ) {
            Global.currentCityName = data.name;
            Global.currentCityId = data.geoId;

            Global.router.navigate( data.geoid.toString(), { trigger: true } );
        }
    });
});