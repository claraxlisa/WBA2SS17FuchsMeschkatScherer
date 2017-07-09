const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");

const ressourceName ="books";

const settings ={
  port:3000,
  datafile : "./testdata.json"
};


//router präsentiert eine instanz der Middleware
router.use(function(req, res, next){
  console.log("book Route Time Log ", Date.now());
  next();
});

//Get auf "/books"
router.get("/", function (req,res){
  res.status(200).send(data.books);
});

//post auf "/user"

router.post('/', bodyParser.json(), function(req, res){
  fs.readFile(settings.datafile, function(err, data){
    var book = JSON.parse(data);
  

        book.books.push({
      
        "isbn": req.body.isbn,
        "name": req.body.name,
        "author": req.body.author,
        "verlag" : req.body.verlag,
        "seiten" : req.body.seiten
        
      });
      fs.writeFile(settings.datafile, JSON.stringify(book, null, 2));
      res.status(200).send("Ein neues buch wurde hinzugefügt. \n");
   
  });
});

router.get("/:isbn", function(req,res){
  //isbn
  var isbn = parseInt(req.params.isbn);

  if(isNaN(isbn)){
  	res.status(400).json(data.errors.badPayload);
  }

  var book = data.books.filter(function(u){
  	return (u.isbn == isbn);

  });

  res.status(200).json(book);

});

router.put('/:isbn', bodyParser.json(), function(req, res){
  fs.readFile(settings.datafile, function(err, data){
    var book = JSON.parse(data);

    //find the searched user and edit his attribute
    for(var i = 0; i < book.books.length; i++ ){
      if(book.books[i].isbn == req.params.isbn){
        book.books[i].name = req.body.name;
        book.books[i].author = req.body.author;
        book.books[i].verlag = req.body.verlag;
        book.books[i].seiten = req.body.seiten;

        fs.writeFile(settings.datafile, JSON.stringify(user, null, 2));
        res.status(200).send("Das Buch mit der ISBN "+ isbn +"wurde erfolgreich bearbeitet");
        
      }
    }
  });
});

module.exports = router;

