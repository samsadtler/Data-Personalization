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