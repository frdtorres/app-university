'use strict';

var schools = require('../controllers/schools');
var reports = require('../controllers/reports');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.school.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

// The Package is past automatically as first parameter
module.exports = function(School, app, auth, database) {

    app.get('/schools/report/:schoolId', reports.school);


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
