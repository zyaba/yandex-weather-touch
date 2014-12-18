define([
    'backbone'
], function( Backbone ) {
    return Backbone.View.extend({
        el: '.display_menu',

        events: {
            'click li': 'onOptionChoose'
        },

        optionsMap: {
            short: 'short',
            details: 'details',
            visual: 'visual'
        },

        initialize: function() {
            _.bindAll( this, 'onOptionChoose', '_animateColumns' );

            this.$visualColumns = null;
            this.$forecast = $('.forecast');
            this.$options = this.$('.display_menu__item');

            this.listenTo( Backbone, 'city:change', this.onCityChange );
            this.listenTo( Backbone, 'visualForecast:render', this.onVisualForecastRender );

            return this;
        },

        render: function() {
            return this;
        },

        onCityChange: function() {
            this._onVisualSectionClick = _.once( this._animateColumns )
        },

        onVisualForecastRender: function() {
            // A bit of hacking.
            // When columns are rendered we want to animate them if
            // they are visible
            if ( $('.forecast_visual' ).is(':visible') ) {
                this._onVisualSectionClick();
            }
        },

        onOptionChoose: function( e ) {
            var $el = $( e.currentTarget ),
                name = $el.data('name');

            this.$forecast
                .removeClass('forecast-short forecast-details forecast-visual' )
                .addClass( 'forecast-' + name );

            this.$options
                .removeClass('display_menu__item-active');

            $el.addClass('display_menu__item-active');

            if ( name === this.optionsMap.visual ) {
                _.defer( this._onVisualSectionClick );
            }
        },

        _onVisualSectionClick: _.noop,

        _animateColumns: function() {
            this.$visualColumns = $('.visual_item__column');
            this.$visualColumns.each( this._setProperHeight )
        },

        /**
         * Animate our columns by setting the right 'max-height' value
         * @param e
         * @private
         */
        _setProperHeight: function( e ){
            var $el = $(this);
            $el.css('max-height', $el.data('max-height') );
        }
    });
});