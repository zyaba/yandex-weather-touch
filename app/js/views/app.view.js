define([
    'backbone',
    'hbs!templates/layout/layout',
    'views/forecast.view'
], function( Backbone, LayoutTemplate, ForecastView ) {
    return Backbone.View.extend({
        template: LayoutTemplate,

        initialize: function() {
            return this;
        },

        render: function() {
            this.setElement( this.template() );
            this.$el.append( ( new ForecastView() ).render().el );

            return this;
        }
    });
});