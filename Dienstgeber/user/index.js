const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const ressourceName ="user";


//router präsentiert eine instanz der Middleware
router.use(function(req, res, next){
  console.log("USer Route Time Log ", Date.now());
  next();
});

//Get auf "/user"
router.get("/", function (req,res){
  res.send("Alle Benutzer...");
});

//Post aud "/user"
router.post("/", bodyParser.json(), function(req, res){
  
  	//validate payloard
	if(data.validateUser(req.body)){
		
		//neue Benutzer Id erstellen
		req.body.id = data.newUserId();

		//Zu In-Memory hionzufügen
		data.user.push(req.body);

		//status 200 zurückgeben und neue uri 
		res.status(200).json( {url: req.protcol+"://" + req.headers.host + "/" + req.params.id});

	}else{
		res.status(400).json(data.errors.badPayload);
	}


});

router.get("/:userId", function(req,res){
  res.send("User mit der ID: " + req.params.id);
});

module.exports = router;
