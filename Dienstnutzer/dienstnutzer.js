var express = require('express');
var http = require('http');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');

var dHost ='http://localhost';
var dPort = 3000;
var dUrl = dHost + ':' + dPort;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//GET users
app.get('/users', function(req, res) {
    var url = dUrl  + '/users';

    request(url, function(err, response, body) {
	body = JSON.parse(body);
	res.json(body);
    });
});


app.get('/users/:id', function(req, res) {
 
    var id = req.params.id;
    var url = dUrl + '/users/' + id;
    request.get(url, function(err, response, body) {
	body = JSON.parse(body);
	res.json(body);
    });
});


//POST auf users
app.post('/users', function(req, res) {

	var url = dUrl + "/users";    
	request(url, function(err, response, body) {
		body = JSON.parse(body);

	    var userData = {
	        "id": body.id,
		"name": body.name,
		"city": body.city,
	    };
	    
	    var url = dUrl + '/users';
	    var options = {
	        uri: url,
		method: 'POST',
		headers: {
		    'Content-type': 'application/json'
		},
		json: userData 
	    }

	    request(options, function(err, response, body) {
		res.json(body);
	    });
	});
});

//------------------------BOOKS-------------------------

// GET all Books
app.get('/books', function(req, res) {	
  
var url = dUrl  + '/books';
   
    request(url, function(err, response, body) {
	body = JSON.parse(body);
	
	//res.json(body);
	
	//Renders View with all books & Search input
	res.render('addbook.ejs', {
		book : body
	});
    });
});


// GET a book with a specific ISBN
app.get('/books/:isbn', function(req, res) {
     var isbn = req.params.isbn;
    var url = dUrl + '/books/' + isbn;

    request.get(url, function(err, response, body) {
	body = JSON.parse(body);
	res.json(body);
    });

});


app.listen(8080, function() {
    console.log("Dienstnutzer ist auf 8080 verfügbar");
});