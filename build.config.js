var assetsPath = '../../bower_components/';

module.exports = {
    baseUrl: 'app/js',

        name: 'main',

    out: 'app.min.js',

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
    },

    hbs: {
        helpers: false
    }
};