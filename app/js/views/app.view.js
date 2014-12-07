define([
    'backbone'
], function( Backbone ) {
    return Backbone.View.extend({
        el: 'body',

        initialize: function() {
            return this;
        },

        render: function() {
            this.$el.html(5);
            return this;
        }
    });
});