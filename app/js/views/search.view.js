define([
    'backbone'
], function( Backbone ) {
    return Backbone.View.extend({
        el: '.search_form',

        events: {
            'focus .search_form__search_input': 'onInputFocus'
        },

        initialize: function() {
            return this;
        },

        render: function() {
            return this;
        },

        onInputFocus: function() {
            alert('not ready');
        }
    });
});