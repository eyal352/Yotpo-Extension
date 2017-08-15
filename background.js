chrome.extension.onMessage.addListener(function(trigger, sender, sendResponse) {
    switch(trigger.init) {
        case "go":
            colorDivs(function(data) {
				sendResponse(data);
			});			
        break;
    }
    return true;
});

 
// send a message to the content script
var colorDivs = function(cb) {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {init: "go"}, function(response){ 
			cb(response.data); 
			// setting a badge
			chrome.browserAction.setBadgeText({text: response.data.test});
		});        
    });
}




















































/*chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.bloop) {
        case "color-divs":
            colorDivs(function(app_key) {
				sendResponse({app_key: app_key}); //send response to popoup.js
			});
        break;
    }
    return true;
});

// send a message to the content script
var colorDivs = function(cb) {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {bleep: "colors-div", color: "#F00"} ,function(response){ cb(response.app_key));
        // setting a badge
        chrome.browserAction.setBadgeText({text: "red!"});
    });
}*/
 
// listening for an event / one-time requests
// coming from the popup