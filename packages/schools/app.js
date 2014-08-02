'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Schools = new Module('schools');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Schools.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Schools.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Schools.menus.add({
        title: 'Escuelas Profesionales',
        link: 'all schools',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Schools.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Schools.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Schools.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Schools;
});
