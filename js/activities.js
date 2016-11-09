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
	"Do %10,4 situps",
	"Do %10,4 crunches",
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

function getRandomActivity() {
	var activityUnformatted = activities[Math.floor(Math.random() * activities.length)];
	console.log(activityUnformatted);
	var matches = [];
	while (match = regex.exec(activityUnformatted)) {
		var str = match["0"];
		var strNumbers = str.split("%")[1].split(",");
		matches.push({at: match.index, median: parseInt(strNumbers[0], 10), range: parseInt(strNumbers[1], 10), length: str.length});
	}
	console.log(matches);
	var activityFormatted = activityUnformatted;
	for (var i = matches.length - 1; i >= 0; i--) {
		console.log(i);
		var reps = Math.floor(Math.random() * (1 + matches[i]['range'])) * 2.0 - matches[i]['range'] + matches[i]['median'];
		activityFormatted = activityFormatted.substr(0,matches[i]['at']) + reps + activityFormatted.substr(matches[i]['at'] + matches[i]['length'], activityFormatted.length);
	} //now, activityFormatted is formatted
	console.log(activityFormatted);
}