var fs = require ('fs');

var obj;

fs.readFile(__dirname + '/staedte.json', function(err, data) {

    if(err) {
    
        console.log(err);
    }

    obj = JSON.parse(data);

    console.log("Ausgabe: ");

    for(var i = 0; i<obj.cities.length;i++) {
    
       console.log("Name: " + obj.cities[i].name);
    	console.log("Country: " + obj.cities[i].country);
    	console.log("Population: " + obj.cities[i].population);
    	console.log("----------------------");
    
    }

});
