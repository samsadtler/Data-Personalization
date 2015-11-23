var counter = 0;
function init() {
  console.log("init")
 
 var htmlToAppend = 
    '<div class="row ">'+
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
  console.log("card added to main page");
  
  $('.container-fluid').prepend(htmlToAppend);
   document.getElementById('input-link').addEventListener('keypress', getTheInput);
}

function getTheInput(event){
  if(event.which == 13){
    var val = document.getElementById('input-link').value;
      // if there is no value, or it is an empty string, prompt the user
      if(!val || val==""){
        return alert("Enter a Link");
      };
      console.log("the value is " + val);
      var inputArray = val.split('**');
      isImageOk(inputArray[0], inputArray);
      // testImage(inputArray[0], inputArray);
      
  } else{
    console.log('Enter not pressed. event.location = ' + event.which)
  }
}

function resetInputValue(element){
  this.element = element;
  document.getElementById(this.element).value = ' ';
}

function isImageOk(img, inputArray) {
  var self = this;
  this.img = img;
  this.inputArray = inputArray
  $.ajax({
  url:self.img,
  type:'HEAD',
  error: function(){
    addNote(self.inputArray);
  },
  success:
      function(d){
        console.log('its and Imasdkghdflk!!' + self.img);
        addImg(self.img);
        addMarker(self.inputArray[0]);
        resetInputValue('input-link');
      }
  });
}

// function testImage(url, timeout) {

//     timeout = timeout || 50000;
//     var timedOut = false, timer;
//     var img = new Image();
//     var 
//     img.onerror = img.onabort = function() {
//         if (!timedOut) {
//             clearTimeout(timer);
//             addNote(self.inputArray);
//         }
//     };
//     img.onload = function() {
//         if (!timedOut) {
//           clearTimeout(timer);
//           function(d){
//             console.log('its and Imasdkghdflk!!' + self.img);
//             addImg(self.img);
//             addMarker(url);
//             resetInputValue('input-link');
//           }
//         }
//     };
//     img.src = url;
//     timer = setTimeout(function() {
//         timedOut = true;
//         console.log('timedOut')
//         callback(url, "timeout");
//     }, timeout); 
// }

function addNote(linkNote){
 this.linkNote = linkNote;
 if (this.linkNote.length > 1){
  var note = this.linkNote[1];
  var link = this.linkNote[0];
  console.log("linkNote = " + this.linkNote);
  console.log("note = " + note);
  console.log("link = " + link);
  addMarker(inputArray[0]);
  resetInputValue('input-link');
  var htmlToAppend = 
          '<div class="col-xs-4 link-'+counter+'">'+
            '<p>'+
              '<a href="'+link+'">'+
                note+
              '</a>'+
            '</p>'+
          '</div>';
          counter++;
  return $('.link-note').prepend(htmlToAppend);
} else {
   return console.log("waiting for input");
  }
}



function addImg(linkImg){
 this.linkImg = linkImg;
  var img = this.linkImg;
  // var link = this.linkNote[0];
  console.log("linkImg = " + this.linkImg);
  console.log("img = " + this.img);
  var htmlToAppend = 
          '<div class="col-xs-4">'+
            '<a href="'+this.img+'">'+
                '<img src="'+this.img+'"; style="width:100%">'+
              '</a>'+
          '</div>';
  return $('.link-note').prepend(htmlToAppend);
}

function addMarker(link){
  this.link = link;
  if (counter > 0){
    addDash(counter - 1);
  }
  var htmlToAppend = 
    '<div class="col-xs-1">'+
    '<div class="circle-container">'+
      // '<div class="circle">'+
      // '</div>'+
      // '<div class="circle">'+
      // '</div>'+
      '<div id="circle" class=" link-'+counter+'">'+
          '<a class="marker-link" href="#link-'+counter+'">'+
          '</a>'+
      '</div>'+ 
      '</div>'+     
    '</div>';
  console.log("counter = " + counter);
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



