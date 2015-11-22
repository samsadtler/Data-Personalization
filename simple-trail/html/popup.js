// chrome.browserAction.onClicked.addListener(function(tab) { 
//     if (msg.popup == "ready for popup"){
//             console.log("pop ready" + JSON.stringify(msg.data));
//                 // re-render the map
//                 port.postMessage({"Tab": "open tab"});
//             }
//             else {
//                  port.postMessage({"Tab": "close tab"});
//             }
//         });

// chrome.runtime.onConnect.addListener(function(port) {
// 	console.assert(port.name == "trailpath");
//   	port.onMessage.addListener(function(msg) {
//     	if (msg.popup == "ready for popup"){
//     		console.log("pop ready" + JSON.stringify(msg.data));
//                 // re-render the map
//                 port.postMessage({"Tab": "open tab"});
//             }
//             else {
//                  port.postMessage({"Tab": "close tab"});
//             }
//         });
//       }); 

chrome.tabs.query({
    active:true,
    lastFocusedWindow:true
}, function(tabs){
    var tab = tabs[0]
    
    console.log(tabs)
    console.log(tab.url)
})


chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_button_in_popup"})
})


chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    var activeTab = tabs[0]
    console.log("send message from popup")
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_button_in_popup"})
})