var express = require('express');

var app = express();

app.get('/user', function(req, res) {
	res.status(200);
	res.send("Listet alle Benutzer auf");
});

app.get('/user/:id', function(req, res) {
	var id = req.params.id;
	res.status(200);
	res.send("User mit der id " + id);
});

app.post('/user/new', function(req, res) {
	console.log("User hinzugefügt");
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

app.listen(3000);
