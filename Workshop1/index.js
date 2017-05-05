var fs = require ('fs');
var chalk = require('chalk');


var obj;

fs.readFile(__dirname + '/staedte.json', function(err, data) {

    if(err) {
    
        console.log(err);
    }

    obj = JSON.parse(data);

    console.log("Ausgabe: ");

    for(var i = 0; i<obj.cities.length;i++) {
    
       console.log("Name: " + chalk.blue(obj.cities[i].name));
    	console.log("Country: " + chalk.red(obj.cities[i].country));
    	console.log("Population: " + chalk.green(obj.cities[i].population));
    	console.log("----------------------");
    
    }
obj.cities.sort(function(a, b){
	
	return a.population - b.population;

});

fs.writeFile(__dirname + '/sortierte_staedte.json', JSON.stringify(obj.cities, null, 2) , function(err) {

	if(err) {
	
	console.log(err);
}
});
});
