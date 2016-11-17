/**
 * Created by Nicole J. Nobles on 11/17/2016.
 */

/**
 * Module Dependencies
 */
var i18n = require("i18next");

/**
 * i18n Configuration
 */
var config = {

    lng         : 'en',
    load        : 'unspecific',
    fallbackLng : ['en','dev'],
    resGetPath  : "locales/__lng__/__ns__.json",
    ns: {
        namespaces  : ['translation'],
        defaultNs   :  'translation'
    },
    ignoreRoutes: ['img/','images/', 'public/', 'css/', 'js/'],

    // Do NOT use in production
    debug       : true,
    saveMissing : true,
    sendMissingTo: 'fallback'

};

$.i18n.init(config, function() {
    $(".nav").i18n();
    //$("body").i18n();
});

//console.log('i18n is initialized.');