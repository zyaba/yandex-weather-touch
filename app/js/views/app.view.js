define([
    'backbone',
    'hbs!templates/layout/layout'
], function( Backbone, LayoutTemplate ) {
    return Backbone.View.extend({
        template: LayoutTemplate,

        initialize: function() {
            return this;
        },

        render: function() {
            this.setElement( this.template() );
            return this;
        }
    });
});