// Use AJAX | Promises to load all 3 JSON files
// Iterate over all JSON files and match the human with their appropriate pet(s)
// ES6-ify it all! 
	//no mor var (let / const)
		//let for variable that may change 
		// const for variable that may change
	//PHAT  Arrow

$(document).ready(function() {


    const outputContainer = $("#output");

    const writeToDOM = (humanArray) => {
        let domString = "";
        for (let i = 0; i < humanArray.length; i++) {
            domString += `<div class="human row">`
            domString += `<div class="col-sm-4">`
            domString += `<img src="${humanArray[i].image}">`
            domString += `<p>${humanArray[i].name}</p>`
            domString += `</div>`
            domString += `<div class="col-sm-8 overflow-row">`
            for (let j = 0; j < humanArray[i].matches.length; j++) {
                domString += `<div class="animal">`
                domString += `<img src="${humanArray[i].matches[j].image}">`
                domString += `<p>${humanArray[i].matches[j].name}</p>`
                domString += `<p>${humanArray[i].matches[j].description}</p>`
                domString += `</div>`
            }
            domString += `</div>`
            domString += `</div>`
        }
        outputContainer.append(domString)
    }



    // const loadHumans = function() {
    //     return new Promise(function(resolve, reject) {
    //         $.ajax("./database/humans.json")
    //             .done(function(data1) {
    //                 resolve(data1.humans);
    //             })
    //             .fail(function(error) {
    //                 reject(error);
    //             });
    //     });
    // };


    const loadHumans = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./database/humans.json")
            .done((data1) => resolve(data1.humans))          
            .fail((error) => reject(error));
        });
    };

    const loadDogs = () => {
        return new Promise((resolve, reject) => {
           $.ajax("./database/dogs.json")
            .done((data1) => resolve(data1.dogs))
            .fail((error) => reject(error));
        });
    };

    const loadCats = () => {
        return new Promise((resolve, reject) => {
           $.ajax("./database/cats.json")
            .done((data1) => resolve(data1.cats))
            .fail((error) => reject(error));
        });
    };

    const loadDinos = () => {
        return new Promise((resolve, reject) => {
           $.ajax("./database/dinos.json")
            .done((data1) => resolve(data1.dinos))
            .fail((error) => reject(error));
        });
    };

    let myHumans = [];
    let myAnimals = [];

    const checkForTypeMatch = (human, pet) => {
        const interestedUnArray = human["interested-in"];
        const isMatchNumber = interestedUnArray.indexOf(pet.type);
        if (isMatchNumber === -1) {
            return false;
        } else {
            return true;
        }
    };


    const checkForKidFriendly = (human, pet) => {
        const hasKids = human["has-kids"];
        const isKidFriendly = pet["kid-friendly"];
        let isMatched = true;
        if (hasKids && !isKidFriendly) {
            isMatched = false;
        }
        return isMatched;
    }


    loadHumans()
        .then(function(humans) {
            humans.forEach((human) => {
                human.matches = [];
                myHumans.push(human);
            });
            Promise.all([loadDogs(), loadCats(), loadDinos()])
                .then((result) => {
                    // console.log(result);
                    result.forEach((xhresult) => {
                        xhresult.forEach( (animal) => myAnimals.push(animal));
                    });

                    for (let i = 0; i < myHumans.length; i++) {
                        for (let j = 0; j < myAnimals.length; j++) {
                            if (checkForTypeMatch(myHumans[i], myAnimals[j]) && checkForKidFriendly(myHumans[i], myAnimals[j])) {
                                myHumans[i].matches.push(myAnimals[j]);
                            }
                        }
                    }
                    console.log("myHumans", myHumans);
                    writeToDOM(myHumans);
                })
                .catch(function(error) {
                    console.log(error);
                });
        })
        .catch(function(humanError) {
            console.log(humanError);
        });


});
