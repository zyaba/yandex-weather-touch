define([
    'configs/urls.config',
    'configs/colours.config',
    'hbs!templates/forecast-day',
    'moment'
], function( urlsConfig, coloursConfig, DayForecastTemplate, moment ) {
    return Backbone.View.extend({
        className: 'forecast',

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
            console.log('finish');
        },

        _parseDayParts: function( dayForecast, part ) {
            var temp;

            if ( part.temp_min === undefined || part.temp_max === undefined ) {
                temp = part.temp - 1 + '   ' + (part.temp + 1);
            } else {
                temp = part.temp_min + '&nbsp;&nbsp;&nbsp;' + part.temp_max;
            }

            dayForecast.parts.push({
                weatherIcon: part.weather_icon,
                timeOfDay: this._getPartLocale( part.type ),
                colour: coloursConfig[ part.temp ],
                tempMin: part.temp_min || part.temp - 1,
                tempMax: part.temp_max || part.temp + 1
            })
        },

        _formatDateString: function( date, index ) {
            switch( index ) {
                case 0:
                    return date.format('Сегодня, D MMMM');
                case 1:
                    return date.format('Завтра, D MMMM');
                default:
                    return date.format('D MMM, dddd');
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