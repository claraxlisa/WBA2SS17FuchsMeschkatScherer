const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const _ = require('lodash');
var fs = require('fs');

const ressourceName ="users";

const settings ={
  port:3000,
  datafile : "./testdata.json"
};

//router präsentiert eine instanz der Middleware
router.use(function(req, res, next){
  console.log("User Route Time Log ", Date.now());
  next();
});

//Get auf "/users"
router.get("/", function (req,res){
  res.status(200).send(data.users);
});


//post auf "/user"

router.post('/', bodyParser.json(), function(req, res){

  data.users.push(req.body);

  fs.readFile(settings.datafile, function(err, data){
    var user = JSON.parse(data);
    var counter = 0;
 
    // Die id des letzten users einlesen
    for(var i = 0; i < user.users.length; i++){
      if(user.users[i].id > counter){
        counter = user.users[i].id;
      }
    }

        user.users.push({
        "id": ++counter,
        "name": req.body.name,
        "city": req.body.city,
        
      });
      fs.writeFile(settings.datafile, JSON.stringify(user, null, 2));
      res.status(200).send("Ein neuer Benutzer wurde angelegt\n");
   
  });
});

//get id
router.get("/:id", function(req,res){
  //id
  var id = parseInt(req.params.id);

  if(isNaN(id)){
  	res.status(400).json(data.errors.badPayload);
  }

  var user = _.find(data.users, ['id', id]);

  if(user == undefined ) {
	return res.status(400).json({ error: "User nicht gefunden" });
  }

//  var user = data.users.filter(function(u){
//  	return (u.id == id);
//
//  });

  res.status(200).json(user);

});

// DELETE Specific User
router.delete('/:id', bodyParser.json(), function(req, res) {
//	fs.readFile(settings.datafile, function(err, data) {
//	var data = JSON.parse(data);
	var id = parseInt(req.params.id);
	
	if(isNaN(id)) {return res.status(400).json({ error : 'Fehler beim Parsen'}) };

	var index = _.findIndex(data.users, ['id', id]);
	
	if(index == -1) {return res.status(404).json({error: "User nicht gefunden"}) };

		data.users.splice(index, 1);
		res.status(200).send("Benutzer gelöscht");
//		for(var i = 0; i < user.users.length; i++) {
//		
//		    if(user.users[i].id == userid) {
//		    	user.users.splice(user.users[i].id, 1);
//		    	//user.users.splice(user.users.indexOf(user.users.id));
//		    	//delete user.users[user.users.id];
//			fs.writeFile(settings.datafile, JSON.stringify(user, null, 2));
//			res.status(200).send("Benutzer gelöscht");
//		    }
//		}
//	});
});

module.exports = router;
