define([
    'backbone'
], function( Backbone ) {
    return Backbone.View.extend({
        el: '.display_menu',

        events: {
            'click li': 'onOptionChoose'
        },

        initialize: function() {
            _.bindAll( this, 'onOptionChoose' );

            this.$forecast = $('.forecast');
            this.$listItems = this.$el.find('li');

            return this;
        },

        render: function() {
            return this;
        },

        onOptionChoose: function( e ) {
            var $el = $( e.currentTarget ),
                name = $el.data('name');

            this.$forecast
                .removeClass('forecast-short forecast-details forecast-visual' )
                .addClass( 'forecast-' + name );

            this.$listItems
                .removeClass('display_menu__item-active');

            $el.addClass('display_menu__item-active');
        }
    });
});