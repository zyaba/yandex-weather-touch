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

            return this;
        },

        render: function() {
            return this;
        },

        onCityChange: function() {
            this._onVisualSectionClick = _.once( this._animateColumns )
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