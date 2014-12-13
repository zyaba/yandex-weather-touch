var assetsPath = '../../bower_components/';

require.config({
    baseUrl: 'app/js',

    paths: {
        jquery: assetsPath + 'jquery/dist/jquery.min',

        underscore: assetsPath + 'lodash/dist/lodash.underscore.min',
        backbone: assetsPath + 'backbone/backbone',

        hbs: assetsPath + 'require-handlebars-plugin/hbs',
        handlebars: assetsPath + 'require-handlebars-plugin/hbs/handlebars.runtime',

        moment: assetsPath + 'momentjs/min/moment.min'
    },

    shim: {
        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        }
    }
});

require([ 'backbone' ], function() {} );
require([ 'jquery', 'views/app.view' ], function( $, AppView ) {
    $(function() {
        var app  = new AppView();
        $('body' ).html( app.render().el );
    });
});