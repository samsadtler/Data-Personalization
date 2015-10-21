/*Handle requests from background.html*/
function handleRequest(request,sender, sendResponse) {
	if (request.callFunction == "toggleSidebar"){
		toggleSidebar();
	}
}
chrome.extension.onRequest.addListener(handleRequest);

/*Small function wich create a sidebar(just to illustrate my point)*/
var sidebarOpen = false;
function toggleSidebar() {
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
		sidebar.innerHTML = '<div class="row ">'+
      '<div class="span11">'+
      '<div class="col-xs-11">'+
       ' <ul>'+
         ' <li>'+
            '<input id="input-link" placeholder="Enter: url + ** + note or add a Image Link" >'+
          '</li>'+
        '</ul>'+
          '<div class="link-note">'+
          '</div>'+
        '</div>'+
      '</div>'+  
      '<div class="span1">'+
        '<div class="col-xs-1 trails">'+
          '<div class="trails-border">'+
        '</div>'+
      '</div>'+
    '</div>';
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
