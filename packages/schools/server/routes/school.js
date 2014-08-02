'use strict';

var schools = require('../controllers/schools');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.school.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

// The Package is past automatically as first parameter
module.exports = function(School, app, auth, database) {
    /*
    app.get('/schools/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/schools/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/schools/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/schools/example/render', function(req, res, next) {
        Schools.render('index', {
            package: 'schools'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });*/

    app.route('/schools')
        // Listar estudiantes
        .get(schools.all) 
        // Registrar estudiante
        .post(auth.requiresLogin, schools.create);

    app.route('/schools/:schoolId')
        .get(schools.show)
        .put(schools.update)
        .post(schools.update)
        .delete(auth.requiresLogin, hasAuthorization, schools.destroy);

        
    // Finish with setting up the articleId param
    app.param('schoolId', schools.school);
};