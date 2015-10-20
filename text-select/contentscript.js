chrome.runtime.onMessage.addListener( 
    function(request, sender, sendResponse) { 
        if (request.method == "getSelection") {
        	console.log('sending this shit');
            sendResponse({data: window.getSelection().toString()});
        }
        else
        	console.log('not sure I saw anything');
            sendResponse({});
    }
)