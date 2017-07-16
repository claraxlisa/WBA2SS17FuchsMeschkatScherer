var express = require('express');
var http = require('http');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var faye = require('faye');
var ejs = require('ejs');

var server = http.createServer();

//var dHost ='http://localhost';
//var dPort = 3000;
//var dUrl = dHost + ':' + dPort;

var dUrl = 'https://uni-buch.herokuapp.com';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get ('/', function(req, res) {
var url = dUrl  + '/books';
   var query = req.query.query;
	console.log(query);

    request(url, function(err, response, body) {
	body = JSON.parse(body);
	//res.json(body);
	res.render('searchbook.ejs', {
		book : body,
		query : query
	});
    });
});


app.post ('/', function(req, res) {
var url = dUrl  + '/books';
   var query = req.query.query;
   console.log(query);
    request(url, function(err, response, body) {
	body = JSON.parse(body);
	
	var book = body.books.filter(function(u){
  	    return (u.query == name);
	});


	//res.json(body);
	res.render('searchbook.ejs', {
		book : body,
		
	});
    });
});


//GET users
app.get('/users', function(req, res) {
    var url = dUrl  + '/users';

    request(url, function(err, response, body) {
	body = JSON.parse(body);
	res.json(body);
	
    });
});


app.get('/users/register', function(req,res) {
    res.render('adduser');
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

	    client.publish('/news', {text: "Ein User wurde hinzugefügt"} ).then(function() {
		console.log('Message received by server');
		
	    }, function(error) {
	      	console.log("There was an error publishing: " + error.message);
	    });

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

/* 
Creates a new Book entry
1. Takes the query from the textfield
2. Replace all spaces wit '+'
3. Make a request to the google books api
4. Save Book data
5. POST book based on 'options'
6. FAYE publish a message
*/
app.post('/books', function(req, res) {

    var description = req.body.description;
	console.log(description);
    var bookQuery = req.body.query;
    var convert = bookQuery.replace(/\s/g, '+');
	console.log(bookQuery);
    var bookUrl ="https://www.googleapis.com/books/v1/volumes/OBM3AAAAIAAJ";
    var isbn = "0261102214";
    var isbnUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + bookQuery;
    var queryUrl = "https://www.googleapis.com/books/v1/volumes?q=" + convert;
    var book;
    var bookData; 

request(queryUrl, function(err, response, body) {
	
	if(err) {
	console.log("Buch wurde nicht gefunden");
	}
	body = JSON.parse(body);
	book = body;

	    var bookData = {
	    	"isbn": body.items[0].volumeInfo.industryIdentifiers[1].identifier,
		"name": body.items[0].volumeInfo.title,
		"autor": body.items[0].volumeInfo.authors,
		"verlag": body.items[0].volumeInfo.publisher,
		"seiten": body.items[0].volumeInfo.pageCount,
		"thumbnail": body.items[0].volumeInfo.imageLinks.smallThumbnail,
		"artikelbeschreibung": description,
		"recommendedCounter": 0
	    };
   
	    var url = dUrl + '/books';
	    var options = {
	        uri: url,
		method: 'POST',
		headers: {
		    'Content-type': 'application/json'
		},
		json: bookData 
	    }

	    client.publish('/news', {text: "Ein Buch wurde hinzugefügt"} ).then(function() {
			console.log('Message received by server');
			
		    }, function(error) {
		      	console.log("There was an error publishing: " + error.message);
	    });

	    request(options, function(err, response, body) {
		//res.json(body);
		res.redirect('/books');
	    });
    });
});

app.put("/books/:isbn", function(req,res) {
    var isbn = req.body.isbn;
    var url = dUrl + '/books/' + isbn;

    request.get(url, function(err, response, body) {
	
	    body = JSON.parse(body);
	   
	    var bookData = {
	    	"isbn": body.isbn,
		"name": body.name,
		"autor": body.autor,
		"verlag": body.verlag,
		"seiten": body.seiten,
		"thumbnail": body.thumbnail,
		"artikelbeschreibung": body.description,
		"recommendedCounter": body.recommendedCounter
	    };

	    var url = dUrl + '/books';
	    var options = {
	        uri: url,
		method: 'PUT',
		headers: {
		    'Content-type': 'application/json'
		},
		json: bookData 
	    }

	    client.publish('/news', {text:"Das Buch mit der ISBN "+ isbn + " wurde geändert"} ).then(function() {
		console.log('Message received by server');
		}, function(error) {
		      	console.log("There was an error publishing: " + error.message);
	    });

	    request(options, function(err, response, body) {
		//res.json(body);
		res.redirect('/books');
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
//	res.render('details', {
//		book : body
//	});
	
    });

});


// DELETE a book with a specific ISBN
app.delete('/books/:isbn', function(req, res) {
    var isbn = req.params.isbn;
    //var url = dHost + ':' + dPort + '/books/' + isbn;
    var url = dUrl + '/books/' + isbn;
    request.delete(url, function(err, response, body) {
	res.json("Buch entfernt");

	client.publish('/news', {text:"Das Buch mit der ISBN " + isbn + " wurde entfernt"} ).then(function() {
		console.log('Message received by server');
	    }, function(error) {
	      	console.log("There was an error publishing: " + error.message);
	});
    });
});

//-----------------------------------------------------------------------
//-----FAYE-----------

var fayeserver = new faye.NodeAdapter({mount: '/faye', timeout: 45});
fayeserver.attach(server);

//serverseitiger Client
var client = new faye.Client('http://localhost:3001' + '/faye');
client.subscribe('/news', function(message) {
    console.log(message.text);
});

server.listen(3001, function() {
    console.log("Listening on 3001");
});


app.listen(8080, function() {
    console.log("Dienstnutzer ist auf 8080 verfügbar");
});