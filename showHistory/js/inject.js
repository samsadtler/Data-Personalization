function addCard(){

  var htmlToAppend = 
  '<div class="container">'+
    '<div class="row">'+
    '<div class="col-md-11">'+

    '</div>'+
      '<div class="col-md-1">'+
        '<div id="typedUrl_div">'+
        'You Made it!'
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';
  console.log("card added to main page");
  return $(document.body).append(htmlToAppend);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
      // Execute some script when the page is fully (DOM) ready
      chrome.tabs.executeScript(null, {code:"addCard();"});
      console.log('tabCreated');
  }
});