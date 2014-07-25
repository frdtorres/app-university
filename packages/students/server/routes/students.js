'use strict';

var students = require('../controllers/students');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.student.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

// The Package is past automatically as first parameter
module.exports = function(Student, app, auth, database) {
    /*
    app.get('/students/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/students/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/students/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/students/example/render', function(req, res, next) {
        Students.render('index', {
            package: 'students'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });*/

    app.route('/students')
        // Listar estudiantes
        .get(students.all) 
        // Registrar estudiante
        .post(auth.requiresLogin, students.create);

    app.route('/students/:studentId')
        .get(students.show)
        .put(students.update)
        .post(students.update)
        .delete(auth.requiresLogin, hasAuthorization, students.destroy);

        
    // Finish with setting up the articleId param
    app.param('studentId', students.student);
};