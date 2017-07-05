const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const ressourceName ="user";


//router präsentiert eine instanz der Middleware
router.use(function(req, res, next){
  console.log("User Route Time Log ", Date.now());
  next();
});

//Get auf "/user"
router.get("/", function (req,res){
  res.status(200).send(data.user);
});

//Post auf "/user"
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

router.get("/:id", function(req,res){
  //id
  var id = parseInt(req.params.id);

  if(isNaN(id)){
  	res.status(400).json(data.errors.badPayload);
  }

  var user = data.user.filter(function(u){
  	return (u.id == id);

  });

  res.status(200).json(user);

});

module.exports = router;
