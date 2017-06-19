var express = require('express');

var app = express();

app.get('/user', function(req, res) {
	res.status(200);
	res.send("Listet alle Benutzer auf");
});

app.post('/user/new', function(req, res) {
	console.log("User hinzugefügt");
});

app.get('/user/:id', function(req, res) {
	var id = req.params.id;
	res.status(200);
	res.send("User mit der id " + id);
});

app.put('/user/:id', function(req, res) {
    var id = req.params.id;
    res.send("User mit ID " + id + "aktuallisiert");
});


app.get('/user/:id/book', function(req, res) {

	var id = req.params.id;
	res.status(200);
	res.send("Alle Bücher von Nutzer " + id);
});

app.post('/user/:id/book', function(req, res) {

	var id = req.params.id;
	res.status(200);
	console.log("Neues Buch anlegen");
});

app.get('/book', function(req, res) {
	res.status(200);
	res.send("Listet alle Bücher auf");
});

app.post('/book/new', function(req, res) {
	console.log("Buch hinzugefügt");
});

app.post('/user/Wishlist/book', function(req, res) {

	res.status(200);
	console.log("Buch auf Wishlist setzen");
});

app.get('/user/Wishlist', function(req, res) {

	res.status(200);
	res.send("Wishlist Aufrufen");
});

app.listen(3000);
