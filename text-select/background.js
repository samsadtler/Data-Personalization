chrome.browserAction.onClicked.addListener(function() {                                                 
    chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {      
        chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, function(response){               
            sendServiceRequest(response.data);                                                          
        });
    });
});

function sendServiceRequest(selectedText) {                                         
    var serviceCall = 'http://www.google.com/search?q=' + selectedText;
    console.log('googling this shit');
    chrome.tabs.create({url: serviceCall});
}


/*Put page action icon on all tabs*/
chrome.tabs.onUpdated.addListener(function(tabId) {
	chrome.pageAction.show(tabId);
});

chrome.tabs.getSelected(null, function(tab) {
	chrome.pageAction.show(tab.id);
});


/*Send request to current tab when page action is clicked*/
chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(
			//Selected tab id
			tab.id,
			//Params inside a object data
			{callFunction: "toggleSidebar", selectedText}, 
			//Optional callback function
			function(response) {
				console.log(response);
			}
		);
	});
});

chrome.tabs.executeScript(null, { file: "jquery-2.1.4.min.js" }, function() {
    chrome.tabs.executeScript(null, { file: "contentscript.js" });
});