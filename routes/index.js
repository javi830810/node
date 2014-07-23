var express = require('express');
var url = require('url');


var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/book', function(req, res) {
    var db = req.db;
    var url_parts = url.parse(req.url, true);
	var queryString = url_parts.query;

    var collection = db.get('usercollection');

    var mongoQuery = {};
    if(queryString.pin != null){
    	mongoQuery.pin = queryString.pin;
    }

    collection.find(mongoQuery,{},function(e, result){
    	res.json(result)
    });
});

/* GET New User page. */
router.get('/new', function(req, res) {
    res.render('new', { title: 'Add New Address' });
});

/* POST to Add User Service */
router.post('/add', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.pin;
    var userEmail = req.body.email;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "pin" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("book");
            // And forward to success page
            res.redirect("book");
        }
    });
});

module.exports = router;
