var players = {
	player1: {
		nickname: "Bob",
		score: 100
	},
	player2: {
		nickname: "Amy",
		score: 200
	},
	player3: {
		nickname: "Grant",
		score: 300
	},
	player4: {
		nickname: "Steve",
		score: 200
	},
	player5: {
		nickname: "Joe",
		score: 500
	}
};

var array = [];
for (var key in players) {
	array.push(players[key]);
}
array.sort(function(a, b){
    return b.score - a.score;
});
var rank = 1;
for (var i = 0; i < array.length; i++) {
  if (i > 0 && array[i].score < array[i - 1].score) {
  	rank++;
  }
	array[i].rank = rank;
}

console.log(array);