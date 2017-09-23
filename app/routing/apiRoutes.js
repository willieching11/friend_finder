var path = require('path');

var friends = require('../data/friends.js');

// Export HTML routes
module.exports = function(app) {
	app.get('/api/friends', function(req, res) {
		return res.send(friends);
	});

	app.post('/api/friends', function(req, res) {
		var userInput = req.body;
		//console.log('userInput = ' + JSON.stringify(userInput));
		userScores = userInput.scores;

		console.log('userScores = ' + JSON.stringify(userScores));

		// //compare the scores of the friends to find the best match
		var differenceArray = [];

		for(var i = 0; i < friends.length; i++) {
			var comparedFriend = friends[i];
			var totalDifference = 0;

			for (var j = 0; j < comparedFriend.scores.length; j++) {
				var findScore = Math.abs(comparedFriend.scores[j] - userInput.scores[j]);
				totalDifference += findScore;
			}

			differenceArray[i] = totalDifference;
		}

		var bfNum = differenceArray[0];
		var bfIndex = 0;

		for(var i = 0; i < differenceArray.length; i++) {
			if (differenceArray[i] < bfNum) {
				bfNum = differenceArray[i];
				bfIndex = i;
			}
		}

		console.log(userInput)
		//push the new friend to the friendsArray
		res.json(friends[bfIndex]);

		friends.push(userInput);
	});
		
};