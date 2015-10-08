var counter = 0;
function init() {
  console.log("init")
 
 var htmlToAppend = 
    '<div class="row">'+
      '<div class="col-xs-11">'+
       ' <ul>'+
         ' <li>'+
            '<input id="input-link" placeholder="Enter: url + ** + note" >'+
          '</li>'+
        '</ul>'+
      '</div>'+
      '<div class="col-xs-1 trails">'+
        '<div class="trails-border">'+
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
      addMarker(inputArray[0]);
      document.getElementById('input-link').value = ' ';
  } else{
    console.log('Enter not pressed. event.location = ' + event.which)
  }
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
      }
  });
}


function addNote(linkNote){
 this.linkNote = linkNote;
  var note = this.linkNote[1];
  var link = this.linkNote[0];
  console.log("linkNote = " + this.linkNote);
  console.log("note = " + note);
  console.log("link = " + link);
  var htmlToAppend = 
          '<div class="col-xs-4">'+
              '<a href="'+link+'">'+note+'</a>'+
          '</div>';
  return $('.link-note').prepend(htmlToAppend);
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



