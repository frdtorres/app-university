'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Students = new Module('students');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Students.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Students.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    /*]Students.menus.add({
        title: 'students example page',
        link: 'students example page',
        roles: ['authenticated'],
        menu: 'main'
    });*/

    Students.menus.add({
        title: 'Estudiantes',
        link: 'all students',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Students.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Students.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Students.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Students;
});
