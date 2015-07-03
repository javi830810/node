var express = require('express');
var router = express.Router();

var getAllStudents = function(req, callback){
    var db = req.db;

    var db = req.db;
    var collection = db.get('studentCollection'); //Ensure we have our database

    var mongoQuery = {};
    collection.find(mongoQuery,{},function(e, result){
    	callback(result)
    });
}

var fetchById = function(id, req, callback){
    var db = req.db;
    var collection = db.get('studentCollection'); //Ensure we have our database

    var mongoQuery = {};
    mongoQuery._id = id;

    collection.find(mongoQuery,{},function(e, result){
        result = result[0];
        if(callback != null)
           callback({
               id: result._id,
               name: result.name,
               last_name: result.last_name,
               email: result.email,
               classes: result.classes
           });
    });
}

/* GET Student listing. */
router.get('/', function(req, res) {

    getAllStudents(req, function(result){
        res.render('students', {
            title: 'School Students',
            students: result,
            host_url: req.protocol + '://' + req.get('host')
        });
    });

});


router.get('/:id', function(req, res) {
    fetchById(req.params.id, req, function(result){
        res.render('student', {
            title: 'Student Schedule',
            student: result,
            host_url: req.protocol + '://' + req.get('host')
        });
    });
});

module.exports = router;
