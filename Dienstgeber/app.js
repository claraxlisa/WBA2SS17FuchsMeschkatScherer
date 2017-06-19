var express = require('express');

var app = express();

app.get('/user', function(req, res) {
	res.status(200);
	res.send("Listet alle Benutzer auf");
});

app.listen(3000);
