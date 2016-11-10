var ready = false;
var THEME_COUNT = 21;

function resetTextColor() {
	bgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
	if (bgColor.substr(0, 4) == "rgba") {
		rgb = bgColor.substring(5, bgColor.length-1)
			.replace(/ /g, '')
			.split(',');
		for (let i = 0; i < rgb.length - 1; i++) {
			rgb[i] = parseInt(rgb[i], 10) + 255 * (1 - parseInt(rgb[3], 10));
			if (rgb[i] > 255) {
				rgb[i] = 255;
			}
		}
		rgb.pop();
	}
	else {
		rgb = bgColor.substring(4, bgColor.length-1)
		 .replace(/ /g, '')
		 .split(',');
	}
	
	//console.log(rgb);
	var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
	
	//console.log(o);
	var color = "white";
	var shadowColor = "black";
	if (o > 125) {
		color = "black";
		shadowColor = "white";
	}

	document.getElementById("titleDiv").style.color = color;
	document.getElementById("titleDiv").style.textShadow = "1px 1px " + shadowColor + ", -1px 1px " + shadowColor + ", 1px -1px " + shadowColor + ", -1px -1px " + shadowColor;
	document.getElementById("activityDiv").style.color = color;
	document.getElementById("activityDiv").style.textShadow = "1px 1px " + shadowColor + ", -1px 1px " + shadowColor + ", 1px -1px " + shadowColor + ", -1px -1px " + shadowColor;

	//document.getElementById("doneButton").style.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
	document.getElementById("doneButton").style.color = color;
	document.getElementById("doneButton").style.textShadow = "1px 1px " + shadowColor + ", -1px 1px " + shadowColor + ", 1px -1px " + shadowColor + ", -1px -1px " + shadowColor;

}

function fillBackground(themeNumber) {
	var theme = "theme" + themeNumber;
	document.body.className = theme;
	resetTextColor();
}

function fillInActivityWhenReady() {
	if (!ready) {
		setTimeout(fillInActivityWhenReady, 10);
		return;
	}
	var activityAndOrder = getNextActivity();

	var activityArea = document.getElementById('activityDiv');
	activityArea.innerText = activityAndOrder.activity;
	fillBackground(activityAndOrder.order);
}

function loadActivityArray() {
	localforage.getItem("randomArray").then(function(value) {
		localforage.getItem("randomArrayOrder").then(function(value2) {
			var arrayAndOrderIfNeedBe = {};
			if (value == undefined) {
				arrayAndOrderIfNeedBe = generateActivityList();
				value = arrayAndOrderIfNeedBe.randomArray;
				value2 = undefined;
				localforage.setItem("randomArray", value);
			}
			if (value2 == undefined) {
				value2 = arrayAndOrderIfNeedBe.arrayOrder;
				localforage.setItem("randomArrayOrder", value2);
			}
			randomArray = value;
			randomArrayOrder = value2;
			ready = true;
		})
		
	})
}

function addResetListener() {
  var resetButton = document.getElementById('resetButton');

  resetButton.onclick = fillInActivityWhenReady;
}

function addDoneListener() {
	var doneButton = document.getElementById('doneButton');

	doneButton.onclick = function() {
		chrome.tabs.getCurrent(function(tab) {
			chrome.tabs.remove(tab.id);
		});
	}
}


window.onload = function() {
	addDoneListener();
	addResetListener();
	loadActivityArray();
	fillInActivityWhenReady();
}
