"use strict";

requirejs.config({
    baseUrl: 'js',

    paths : {
        nools: 'libs/nools',
        backbone: 'libs/backbone',
        backbone_query: 'libs/backbone.queryparams',
        backbone_querystring_shim: 'libs/backbone.queryparams-1.1-shim',
        backbone_jsynth: 'libs/backbone.jsynth',
        underscore: 'libs/underscore',
        jquery: 'libs/jquery-2.1.0',
        "bootstrap": 'libs/bootstrap',
        text: 'libs/text',
        'string-format': 'libs/string-format',
        'backbone_cache': 'libs/backbone.fetch-cache',
        'modernizr': 'libs/modernizr'
    },
    shim: {
        "underscore": {
            deps: [],
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

requirejs([
    'underscore',
    'backbone'
], function(_, Backbone) {
    window.app = {};
    var query = _.chain(window.location.search.substring(1).split('&'))
        .map(function(params) {
            var p = params.split('=');
            return [p[0], decodeURIComponent(p[1])];
        }).object().value();
    if(query.app) {
        require([query.app], function (App) {
            window.app[query.app] = new App();
            window.app.query = query;
            Backbone.history.start();
        })
    }
});