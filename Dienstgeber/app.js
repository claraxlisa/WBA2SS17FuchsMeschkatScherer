var express = require('express');
var app = express();
var async = require('async');
var bodyParser = require('body-parser');
var fs = require('fs');


app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
			data.users = JSON.parse(filestring).users;
			data.books = JSON.parse(filestring).books;
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

const users = require('./users');
app.use('/users/', users);

const books = require('./books');
app.use('/books/', books);
 
app.listen(settings.port, function(){
	console.log("Server läuft auf Port " + settings.port);
});
