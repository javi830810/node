var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var host_url = req.protocol + '://' + req.get('host') + "/api";
    res.json(
      {
          teacher: {
            getAll: {
                method: 'GET',
                url: host_url + "/teacher",
            },
            getById: {
                method: 'GET',
                url: host_url + "/teacher/{id}"
            },
            addClass: {
                method: 'POST',
                url: host_url + "/teacher/class",
                params: {
                    encoded: 'x-www-form-urlencoded',
                    name: '{name}',
                    start: '{start}',
                    end: 'end'
                }
            }
          },
          student: {
            getAll: {
                method: 'GET',
                url: host_url + "/student",
            },
            getById: {
                method: 'GET',
                url: host_url + "/student/{id}"
            },
            addToClass: {
                method: 'POST',
                url: host_url + "/student/class",
                params: {
                    encoded: 'x-www-form-urlencoded',
                    class_id: '{classId}',
                    student_id: '{studentId}'
                }
            }
          }

    });
});

module.exports = router;
