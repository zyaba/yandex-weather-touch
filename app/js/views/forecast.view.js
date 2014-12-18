define([
    'moment',
    'globals/main.global',
    'configs/main.config',
    'locales/parts.locale',
    'hbs!templates/forecast/forecast.item',
    'hbs!templates/forecast/forecast.today',
    'hbs!templates/forecast/forecast.visual'
], function(
    moment,
    Global,
    mainConfig,
    partsLocale,
    ForecastItemTemplate,
    ForecastTodayTemplate,
    ForecastVisualTemplate
) {
    return Backbone.View.extend({
        el: '.forecast',

        templateForecastItem: ForecastItemTemplate,

        templateForecastToday: ForecastTodayTemplate,

        templateForecastVisual: ForecastVisualTemplate,

        initialize: function() {
            _.bindAll( this, '_parseDayParts', '_onForecastGetSuccess', '_onForecastGetError', '_onForecastFetchDone' );

            this.listenTo( Backbone, 'city:change', this.onCityChange );

            return this;
        },

        render: function() {
            this.$spinner = this.$('.spinner');
            this.$errMsg = this.$('.error');

            return this;
        },

        onCityChange: function( geoid ) {
            this.currentCityGeoId = geoid;
            this._removePrevInfo();
            this.$errMsg.hide();

            $.when( this._getForecastData() )
                .done( this._onForecastFetchDone );
        },

        _removePrevInfo: function() {
            this.$('.day_forecast_wrapper' ).remove();
            this.$('.forecast_visual' ).remove();

            this.$spinner.show();
        },

        _onForecastFetchDone: function() {
            this.$spinner.hide();

            //this._removePrevInfo(); // @TODO: remove
            //this.$('.spinner' ).hide();

            this._renderOverall();
            this._renderToday();
            this._renderVisual();
        },

        _renderOverall: function() {
            _.each( this.data, function( day ) {
                this.$el.append( this.templateForecastItem( day ) );
            }.bind( this ));
        },

        _renderToday: function() {
            var forecastToday = this.templateForecastToday( this.initialData.fact );
            this.$('.day_forecast_wrapper:first .day_forecast__header' ).after( forecastToday );
        },

        _getForecastData: function() {
            return $.ajax({
                url: mainConfig.urlsConfig.forecast.replace('{geoid}', this.currentCityGeoId),
                success: this._onForecastGetSuccess,
                error: this._onForecastGetError
            });
        },

        _onForecastGetError: function() {
            Backbone.trigger('getForecast:error');
            this.$spinner.hide();
            this.$errMsg.show();
        },

        _onForecastGetSuccess: function( data ) {
            console.log( data );

            Global.currentCityName = data.info.name;
            Backbone.trigger('getForecast:success');
            this.$errMsg.hide();

            var dayObj,
                date,
                i;

            this.data = [];
            this.initialData = data;

            _.each( data.forecast, function( dayForecast, index ) {
                // TODO: remove?
                if ( index > 3 ) {
                    return false;
                }

                date = moment( dayForecast.date );
                dayObj = {
                    date: this._formatDateString( date, index ),
                    parts: []
                };

                for ( i = 0; i < 4; i++ ) {
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

        _parseVisualData: function() {
            var range = mainConfig.VISUAL_GRAPH_MAX_HEIGHT - mainConfig.VISUAL_GRAPH_MIN_HEIGHT,
                maxTemp = 0,
                minTemp = 0,
                result = [],
                diff,
                step,
                date,
                dayTemp,
                position;

            // Find min and max values and add required data to the object
            _.each( this.initialData.forecast, function( dayData ) {
                date = moment( dayData.date );
                dayTemp = dayData.parts[ 1 ].temp;

                if ( dayTemp > maxTemp ) {
                    maxTemp = dayTemp;
                }

                if ( dayTemp < minTemp ) {
                    minTemp = dayTemp;
                }

                result.push({
                    temp: dayTemp,
                    weekDay: moment( dayData.date ).format('dd'),
                    weatherIcon: dayData.parts[ 1 ].weather_icon,
                    isWeekend: date.get('day') === 6 || date.get('day') === 0
                });
            });

            // Calculate how many pixels are in one step
            diff = maxTemp - minTemp;
            step = range / diff;

            // Calculate the proper height
            _.each( result, function( obj ) {
                position = maxTemp - obj.temp;
                obj.height = mainConfig.VISUAL_GRAPH_MAX_HEIGHT - position * step;

                if ( obj.temp > 0 ) {
                    obj.tempClass = 'positive';
                } else if ( obj.temp < 0 ) {
                    obj.tempClass = 'negative';
                }
            });

            return result;
        },

        _renderVisual: function() {
            var data = this._parseVisualData();
            this.$el.append( this.templateForecastVisual( data ) );
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