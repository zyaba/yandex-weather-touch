define([
    'configs/urls.config',
    'configs/colours.config',
    'locales/parts.locale',
    'hbs!templates/forecast.item',
    'hbs!templates/forecast.today',
    'moment'
], function( urlsConfig, coloursConfig, partsLocale, ForecastItemTemplate, ForecastTodayTemplate, moment ) {
    return Backbone.View.extend({
        el: '.forecast',

        templateForecastItem: ForecastItemTemplate,

        templateForecastToday: ForecastTodayTemplate,

        initialize: function() {
            _.bindAll( this, '_parseDayParts', '_onForecastGetSuccess', '_renderData' );
            return this;
        },

        render: function() {
            $.when( this._getForecastData() )
                .done( this._renderData );

            return this;
        },

        _renderData: function() {
            this._renderOverall();
            this._renderToday();
        },

        _renderOverall: function() {
            _.each( this.data, function( day ) {
                this.$el.append( this.templateForecastItem( day ) );
            }.bind( this ));
        },

        _renderToday: function() {
            var forecastToday = this.templateForecastToday( this.dataFact );
            this.$el.find('.day_forecast_wrapper:first .day_forecast__header' ).after( forecastToday );
        },

        _getForecastData: function() {
            return $.ajax({
                url: urlsConfig.forecast,
                success: this._onForecastGetSuccess
            });
        },

        _onForecastGetSuccess: function( data ) {
            console.log( data );
            var date;

            this.data = [];
            this.dataFact = data.fact;

            _.each( data.forecast, function( dayForecast, index ) {
                if ( index > 3 ) {
                    return false;
                }
                date = moment( dayForecast.date );
                dayObj = {
                    date: this._formatDateString( date, index ),
                    parts: []
                };

                for ( i=0; i < 4; i++ ) {
                    this._parseDayParts( dayObj, dayForecast.parts[i] )
                }

                this.data.push( dayObj );
            }.bind( this ));
        },

        _parseDayParts: function( dayForecast, part ) {
            dayForecast.parts.push({
                weatherIcon: part.weather_icon,
                timeOfDay: partsLocale[ part.type ],
                tempMin: part.temp_min || part.temp - 1,
                tempMax: part.temp_max || part.temp + 1,
                weather: part.weather,
                wind_direction: part.wind_direction,
                wind: part.wind,
                temp: part.temp,
                wind_speed: part.wind_speed,
                humidity: part.humidity,
                pressure: part.pressure
            })
        },

        _formatDateString: function( date, index ) {
            switch( index ) {
                case 0:
                    return date.format('Сегодня, D MMMM');
                case 1:
                    return date.format('Завтра, D MMMM');
                default:
                    return date.format('D MMMM, dddd');
            }
        }
    });
});