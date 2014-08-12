'use strict';

var PDFDocument = require('pdfkit')
  , mongoose = require('mongoose')
  , Student = mongoose.model('Student')
  , School = mongoose.model('School')
  , fs=require('fs');

/**
 * Show an school
 */
exports.school = function(req, res) {

  var schoolId = req.params.schoolId;

  School.load(schoolId, function(err, school) {
     if (err) return err;
     if (!school) return new Error('Failed to load school');

     Student.find()
       .populate('schools', 'name')
       .populate('user', 'name username')
       .where('schools', { $elemMatch: { $in: [schoolId] }})
       .sort('fatherName')
       .exec(function(err, students) {

         if (err) {
           return res.json(500, {
             error: 'Cannot list the students'
           });
         }

         var doc = new PDFDocument();
         doc.pipe( fs.createWriteStream('out.pdf') );

         var schoolName = 'Escuela profesional de ' + school.name;
         schoolName.capitalize()

         doc.y = 45;
         doc.fillColor('black')

         doc.text(schoolName, {
            paragraphGap: 10,
            indent: 20,
            align: 'center',
            width: 460
         });

         doc.moveTo(40, 62)
            .lineTo(572, 62)
            .fill('black', 'even-odd');

         doc.moveTo(40, 64)
            .lineTo(572, 64)
            .fill('black', 'even-odd');

         doc.moveTo(40, 82)
            .lineTo(572, 82)
            .fill('black', 'even-odd');

         // Title Font size
         doc.fontSize(9);


         // Titles
         var titleY = 70;
         doc.text('N°', 50, titleY);
         doc.text('APELLIDOS Y NOMBRES', 70, titleY);
         doc.text('DNI', 240, titleY);
         doc.text('TELÉFONO', 300, titleY);
         doc.text('DIRECCIÓN', 370, titleY);

         // Title Font size
         doc.fontSize(10);
         var i;

         students.forEach(function(student, key) {

           var el = 90 + key * 20;

           var fullName = student.fatherName.capitalize() +
                          ' ' +
                          student.motherName.capitalize() +
                          ' ' +
                          student.names.capitalize();

           doc.text(key+1, 50, el);
           doc.text(fullName, 70, el);
           doc.text(student.dni, 240, el);
           doc.text(student.telephone, 300, el);
           doc.text(student.address, 370, el);

         });

         //draw bounding rectangle
         // doc.rect(40, 40, 532, 712).stroke();

         doc.pipe( res );
         doc.end();

       });

   });

  String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };
};
