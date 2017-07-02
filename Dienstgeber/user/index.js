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
  console.log(req.body);
  res.status(200).json( {url: req.protcol+"://" + req.headers.host + "/" + req.params.id});
});

router.get("/:userId", function(req,res){
  res.send("User mit der ID: " + req.params.id);
});

module.exports = router;
