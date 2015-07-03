var express = require('express');
var router = express.Router();

/* GET Teacher listing. */
router.get('/', function(req, res) {
    res.render('teacher', { title: 'School Teachers' });
});

module.exports = router;
