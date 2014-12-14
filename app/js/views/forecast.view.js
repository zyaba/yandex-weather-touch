define([
    'configs/urls.config',
    'configs/colours.config',
    'hbs!templates/forecast-day',
    'moment'
], function( urlsConfig, coloursConfig, DayForecastTemplate, moment ) {
    return Backbone.View.extend({
        el: '.forecast',

        dayForecastTemplate: DayForecastTemplate,

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
            _.each( this.data, function( day ) {
                this.$el.append( this.dayForecastTemplate( day ) );
            }.bind( this ));
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
                timeOfDay: this._getPartLocale( part.type ),
                colour: coloursConfig[ part.temp ],
                tempMin: part.temp_min || part.temp - 1,
                tempMax: part.temp_max || part.temp + 1,
                weather: _.capitalize( part.weather ),
                wind_direction: part.wind_direction,
                wind: part.wind,
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
        },

        _getPartLocale: function( part ) {
            var parts = {
                morning: 'Утром',
                day: 'Днем',
                evening: 'Вечером',
                night: 'Ночью'
            };

            return parts[ part ];
        }
    });
});