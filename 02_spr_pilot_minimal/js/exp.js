var initExp = function() {
	var exp = {};
	exp.circleNumber = 10;
	exp.quantifierNumber = 4;
	exp.quantifiers = ["Some", "All", "None", "Most"];

	// func that returns the number of the pictures
	var getPictureNumber = function() {
	return exp.circleNumber;
	};

	// func that returns a list of objects representing every picture type
	var generatePictureTypes = function() {
		number = getPictureNumber();
		var types = [];
		for (var i=0; i<=number; i++) {
			types.push({black: i, all: number});
		};
		return types;
	};

	// fun that creates picture - quantifier - colour combinations
	// returns a list of objects
	// every object contains num of black circles, num of all circles
	// target colour and quantifier
	var generatePQComb = function() {
		var pictureTypes = generatePictureTypes();
		var combinations = [];
		var quantifiers = exp.quantifiers;

		// picture - quantifier combination
		for (var i = 0; i < pictureTypes.length; i++) {
			for (var j = 0; j < quantifiers.length; j++) {
				combinations.push({
					all: pictureTypes[i].all,
					black: pictureTypes[i].black,
					quantifier: quantifiers[j]
				});
			};
		};

		return shuffleComb(combinations);
	};

	// func shuffles the list of PQC objects
	// returns a shuffled list of PQC objects
	var shuffleComb = function(comb) {
		var counter = comb.length;

		while (counter > 0) {
			let index = Math.floor(Math.random() * counter);
			counter--;

			let temp = comb[counter];
			comb[counter] = comb[index];
			comb[index] = temp;
		};

		return comb;
	};

	var addTargetColours = function() {
		combinations = generatePQComb();

		for (var i = 0; i < combinations.length; i++) {
			if (i < (combinations.length/2)) {
				combinations[i].colour = "black";
			} else {
				combinations[i].colour = "white";			
			}
		};

		return shuffleComb(combinations);
	};

	exp.data = addTargetColours();
	exp.data.subjInfo = {};

	exp.addSubjInfo = function(info) {
		console.log("add additional Info");
		exp.data.subjInfo = info;
	};

	exp.addResponse = function(trialIndex, response, rt) {
		exp.data[trialIndex].response = response;
		exp.data[trialIndex].readingTimes = rt;
	};

	return exp;
};