var express = require('express');
var app = express();
var async = require('async');
var bodyParser = require('body-parser');
var fs = require('fs');

const settings ={
	port:3000,
	datafile : "./testdata.json"
};

//In-Memory
global.data = require("./data");

//von Speicher in Arbeitsspeicher einlesen
async.waterfall([

	//readfile aufruf - settings.datafile ist der Dateiname--utf8n das Encoding--
	//wenn read erfolgreich war erhalten wir einen callback -- function(err, filestring) dieser enthät einen Fehler oder die Inhalte der Datei
	//
	function(callback){
		fs.readFile(settings.datafile, 'utf8', function(err, filestring) {callback(null, err, filestring); });

	},

	//in Json parsen 
	function(err, filestring, callback){

		//erst überprüfen wir ob ein Fehler enthalten ist
		if(err != null){
			callback(null, false);
		}else{
			//falls kein Fehler gefunden wurde in Json parsen
			data.user = JSON.parse(filestring).user;
			data.book = JSON.parse(filestring).book;
			callback(null, true);
		}
	}
], function(err, success){
		//falls ein fehler ist success auf false setzen 
		if(err != null){
			callback(null,false);
		}

		//Consolenausgabe
		console.log('Daten wurden '+(success ? 'erfolgreich' : 'nicht erfolgreich')+' in den Speicher gelesen');


		}
	);




//Errorhandler
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.end(err.status + ' ' + err.messages);
})

//Log mit Pfad und Zeitangabe
app.use(function(req, res, next){
	console.log('Time: %d' + 'Request-Pfad: ' + req.path, Date.now());
	next();
});

//Routing

const user = require('./user');
app.use('/user/', user);

const book = require('./book');
app.use('/book/', book);

//Pfad '/'
/*
app.get("/", function(req, res){
	res.send("Get auf /");
});

app.post("/", function(req, res){
	res.send("post");
});

//get auf Pfad '/user'
app.get("/user", function(req, res){
	res.send("Get /user");
});

app.put("/user", function(req, res){
	res.send("Put /user");
});

app.post("/user", function(req, res){
	res.send("post /user");
});

app.delete("/user", function(req, res){
	res.send("delete /user");
});

//GEt Request mit Parametern
app.get('/user/:userID', function(req, res){
	"UserID " + req.params.userId;
});

*/

/*
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

app.delete('/user/:id/book', function(req, res){

	var id = req.params.id;
	res.status(200);
	res.send("Buch vom Benutzer wird gelöscht")
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

app.get('/category', function(req, res){

		res.status(200);
		res.send("Kategorie Abrufen");
});

*/

app.listen(settings.port, function(){
	console.log("Server läuft auf Port " + settings.port);
});
