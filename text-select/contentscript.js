chrome.runtime.onMessage.addListener( 
    function(request, sender, sendResponse) { 
        if (request.method == "getSelection") {
        	console.log('sending this shit');
            sendResponse({data: window.getSelection().toString()});
            toggleSidebar(window.getSelection().toString());
        }
        else
        	console.log('not sure I saw anything');
            sendResponse({});
    }
)

/*Handle requests from background.html*/
function handleRequest(request,sender, sendResponse) {
	console.log("trying to handle your request")
	if (request.callFunction == "toggleSidebar"){
		console.log('i want to toggle your bar')
	}
}
chrome.extension.onRequest.addListener(handleRequest);

/*Small function wich create a sidebar(just to illustrate my point)*/
var sidebarOpen = false;
function toggleSidebar(dataAppend) {

	if(sidebarOpen) {
		console.log('sidebar is open!')
		var el = document.getElementById('mySidebar');
		el.parentNode.removeChild(el);
		sidebarOpen = false;
	}
	else {
		
		console.log('open the sidebar!')
		var sidebar = document.createElement('div');
		sidebar.id = "mySidebar";
		console.log('dataAppend = '+ dataAppend);
		return true
		sidebar.innerHTML = 
			'<div>'+"I'm gonna append your data "+dataAppend+'</div>';
				sidebar.style.cssText = "\
					position:fixed;\
					top:0px;\
					left:0px;\
					width:30%;\
					height:100%;\
					background:white;\
					box-shadow:inset 0 0 1em black;\
					z-index:999999;\
				";
			document.body.appendChild(sidebar);

			sidebarOpen = true;


	}
}
