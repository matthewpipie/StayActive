// %10,2 means 8, 9, 10, 11, or 12
var activities = [
	"Do %15,5 jumping jacks.",
	"Do %11,5 pushups.",
	"Do %25,15 seconds of plank.",
	"Run in place for %25,8 seconds.",
	"Do %15,5 high knees for each leg.",
	"Take a stretch.",
	"Do %20,5 wall pushups.",
	"Spin in a circle %3,1 times to the left, then %3,1 times to the right.",
	"Make %10,3 small circles with your arms.",
	"Jump over a pencil %8,3 times.",
	"Jump as high as you can %8,3 times.",
	"Do %10,4 situps.",
	"Do %10,4 crunches.",
	"Take a fighting stance, jab %13,4 times, and cross %12,5 times.",
	"Climb %9,3 rungs of an invisible ladder.",
	"Wall sit for %15,5 seconds.",
	"Hop from your left foot to your right foot %15,4 times.",
	"Pedal your legs for %14,2 seconds.",
	"Do %13,3 squats.",
	"Do %11,5 tricep dips.",
	"Walk around the room %3,1 times.",
	"Run around the room %3,1 times.",
	"Do %11,3 step-ups onto a chair.",
	"Do %10,3 lunges.",
	"Do %6,2 pushups with rotation.",
	"Do %15,3 seconds of side plank.",
	"Stand up and touch your toes %8,3 times.",
	"Lay down and do %10,2 bicycle crunches.",
	"March in place for %30,20 steps."
]

var regex = /%\d+,\d+/g;

function fillRandomNumbers(string) {
	var matches = [];
	while (match = regex.exec(string)) {
		var str = match["0"];
		var strNumbers = str.split("%")[1].split(",");
		matches.push({at: match.index, median: parseInt(strNumbers[0], 10), range: parseInt(strNumbers[1], 10), length: str.length});
	}
	for (var i = matches.length - 1; i >= 0; i--) {
		var reps = Math.floor(Math.random() * (1 + matches[i]['range'])) * 2.0 - matches[i]['range'] + matches[i]['median'];
		string = string.substr(0,matches[i]['at']) + reps + string.substr(matches[i]['at'] + matches[i]['length'], string.length);
	}
	return string;
}

function fillWithRandomNumbers(array) {
	for (var i = 0; i < array.length; i++) {
		array[i] = fillRandomNumbers(array[i]);
	}
}

function shuffleArray(array) {
	var newLocations = [];
	var unmodArray = array.slice();
	for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    for (var i = 0; i < array.length; i++) {
    	newLocations.push(unmodArray.indexOf(array[i]));
    }
    console.log(newLocations)
    return newLocations;
}

function generateActivityList() {
	var randomArray = activities.slice();
	fillWithRandomNumbers(randomArray);
	var arrayOrder = shuffleArray(randomArray);
	console.log(randomArray);
	console.log(arrayOrder);
	return {randomArray: randomArray, arrayOrder: arrayOrder};
}

var randomArray = [];
var randomArrayOrder = [];

function getNextActivity() {
	if (randomArray.length == 0) {
		var arrayAndOrder = generateActivityList();
		randomArray = arrayAndOrder.randomArray;
		randomArrayOrder = arrayAndOrder.arrayOrder;
		localforage.setItem("randomArrayOrder", randomArrayOrder);
	}
	var activity = randomArray.pop();
	var order = randomArrayOrder[randomArray.length];
	localforage.setItem("randomArray", randomArray);
	console.log(randomArray);
	return {activity: activity, order: order}
}
