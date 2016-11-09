function fillInActivity() {
    var activity = getRandomActivity();

    var activityArea = document.getElementById('activity');
    activityArea.innerText = activity;
}

function addResetListener() {
  var resetButton = document.getElementById('reset-button');

  resetButton.onclick = fillInActivity;
}

function addDoneListener() {
    var doneButton = document.getElementById('done-button');

    doneButton.onclick = function() {
        chrome.tabs.getCurrent(function(tab) {
            chrome.tabs.remove(tab.id);
        });
    }
}


window.onload = function() {
    addDoneListener();
    addResetListener();
    fillInActivity();
}
