// Use AJAX | Promises to load all 3 JSON files
// Iterate over all JSON files and match the human with their appropriate pet(s)
// ES6-ify it all!
$(document).ready(function(){

    var loadHumans = function () {
        return new Promise(function(resolve, reject) {
            $.ajax("./database/humans.json")
            .done(function(data1){
                resolve(data1.humans);
            })
            .fail(function(error){
                reject(error);
            });
        });
    };

    var loadDogs = function () {
        return new Promise(function(resolve, reject) {
            $.ajax("./database/dogs.json")
            .done(function(data1){
                resolve(data1.dogs);
            })
            .fail(function(error){
                reject(error);
            });
        });
    };

    var loadCats = function () {
        return new Promise(function(resolve, reject) {
            $.ajax("./database/cats.json")
            .done(function(data1){
                resolve(data1.cats);
            })
            .fail(function(error){
                reject(error);
            });
        });
    };

    var loadDinos = function () {
        return new Promise(function(resolve, reject) {
            $.ajax("./database/dinos.json")
            .done(function(data1){
                resolve(data1.dinos);
            })
            .fail(function(error){
                reject(error);
            });
        });
    };

    var myHumans = [];
    var myAnimals = [];

    var checkForTypeMatch = function(human,pet){
    	var interestedUnArray = human ["interested-in"];
    	var isMatchNumber = interestedUnArray.indexOf(pet.type);
    	if (isMatchNumber === -1){
    		return false ;
    	}else {
    		return true ;
    	}
    };


    loadHumans().then(function(humans){
        humans.forEach(function(human){
        	human.matches=[];
            myHumans.push(human);
        });
        Promise.all([loadDogs() , loadCats(),loadDinos()]) 
		    .then (function(result){
		    	// console.log(result);
		    	result.forEach(function(xhresult){
		    		xhresult.forEach(function(animal){
		    			// console.log("xhresult",xhresult);
		    			myAnimals.push(animal);	
		    		});
		    	});
		    	for(var i= 0 ; i < myHumans.length ;i++ ){
		    		for(var j= 0 ; j < myAnimals.length ;j++ ){
		    			if (checkForTypeMatch(myHumans[i],myAnimals[j])){
		    				// console.log(myHumans[i]);
		    			// myHumans[i].matches(myAnimals[j]);
		    			myHumans[i].matches.push(myAnimals[j]);
		    			// console.log(checkForTypeMatch((myHumans[i],myAnimals[j]);
		    			}	
		    		} 
		    	}
		    	console.log("myHumans",myHumans);
		    });
    });

    // Promise.all([loadDogs() , loadCats(),loadDinos()]) 
    // .then (function(result){
    // 	console.log(result);
    // 	result.forEach(function(xhresult){
    // 		xhresult.forEach(function(animal){
    // 			console.log("xhresult",xhresult);
    // 			myAnimals.push(animal);	
    // 		});
    // 	});
    // 	console.log("myAnimal",myAnimals);
    // });





});