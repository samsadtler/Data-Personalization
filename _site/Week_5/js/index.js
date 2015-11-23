var counter = 0;
function init() {
  console.log("init")
 
 var htmlToAppend = 
    '<div class="row">'+
      '<div class="col-xs-11">'+
       ' <ul>'+
         ' <li>'+
            '<input id="input-link" placeholder="Enter a website you want to keep!" >'+
          '</li>'+
        '</ul>'+
      '</div>'+
      '<div class="col-xs-1 trails">'+
        '<div class="trails-border">'+
      '</div>'+
    '</div>';
  console.log("card added to main page");
  
  $('.container-fluid').prepend(htmlToAppend);
   document.getElementById('input-link').addEventListener('change', getTheInput);
}

function getTheInput(event){
  var val = document.getElementById('input-link').value;
    // if there is no value, or it is an empty string, prompt the user
    if(!val || val==""){
      return alert("Enter a Link");
    };
    console.log("the value is " + val); 
    addCard(val);
    document.getElementById('input-link').value = ' ';
}

function addCard(link){
  this.link = link;
  if (counter > 0){
    addDash(counter - 1);
  }


  var htmlToAppend = 
      '<div class="circle-outer">'+
        '<div class="circle-outer-inner">'+
          '<div class="circle link-'+counter+'">'+
              '<a href="'+this.link+'">'+
              '</a>'+
            '</div>'+
          '</div>'+
        '</div>'+     
      '</div>';
  console.log("counter = " + counter);
  counter++;
  return $('.trails').prepend(htmlToAppend);
}

function addDash(count){
  this.count = count;
  var htmlToAppend = 
    '<div class="linker">'+
    '</div>';
    console.log("dash added")
    return $('.link-'+this.count).prepend(htmlToAppend);
}

window.addEventListener('onload', init());



