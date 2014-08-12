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

    app.post('/upload/:studentId?', students.upload);

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
