var currentTrail;
var localhost = 'http://sudosubdocs.herokuapp.com'

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "trailpath");
  port.onMessage.addListener(function(msg) {
    if (msg.trail == "add trail"){
      console.log("add trail" + JSON.stringify(msg.data));
      jQuery.ajax({
        url : localhost + '/api/create/trail',
        dataType : 'json',
        type : 'POST',
        // we send the data in a data object (with key/value pairs)
        data : msg.data,
        success : function(response){
            if(response.status=="OK"){
                // success
                console.log('create a trail please, but seriously you promised = '+response);
                // re-render the map
                port.postMessage({"status": "Ok"});
                // renderTrailMap();
                // now, clear the input fields
                jQuery("#addTrail input").val('');
            }
            else {
                alert("something went wrong");
            }
        },
        error : function(err){
            // do error checking
            port.postMessage({"status": "error" });
            alert("something went wrong");
            console.error(err);
        }
      }); 

      // prevents the form from submitting normally
      // port.postMessage({status: "Ok" });
		

	   }  		
    if (msg.display == "display trail"){
    	jQuery.ajax({
          url : localhost + '/api/get/trail',
          dataType : 'json',
          success : function(response) {
              var trail = response.trail;
              console.log("is response empty? " + jQuery.isEmptyObject({response}));  
              console.log("ajax response.trail = "+ response.trail);
              // now, render the animal image/data
              port.postMessage({"status": "Ok", res: trail});
          },
          error : function(err){
          // do error checking
          console.log("something went wrong");
          console.error(err);
        }
    })
  		console.log("display trail");
  	}
    if (msg.add == "step"){
       jQuery.ajax({
          url : '/api/create/step',
          dataType : 'json',
          type : 'POST',
          // we send the data in a data object (with key/value pairs)
          data : msg.data,
          success : function(response){
              if(response.status=="OK"){
                  port.postMessage({step: "step added"});
              }
              else {
                  alert("something went wrong");
              }
          },
          error : function(err){
              // do error checking
              alert("something went wrong");
              console.error(err);
          }
      }); 
    	console.log("in background add step");
    }
  });
});



// CUSTOM JS FILE //


function init() {
  renderTrailMap();
}

    
function renderTrailMap() {
    console.log("render that shit");
    jQuery.ajax({
        url : localhost + '/api/get/trail',
        dataType : 'json',
        success : function(response) {
            var trail = response.trail;
            console.log("is response empty? " + jQuery.isEmptyObject({response}));  
            console.log("ajax response.trail = "+ response.trail);
            // now, render the animal image/data
            renderTrail(trail);
        },
        error : function(err){
        // do error checking
        console.log("something went wrong");
        console.error(err);
        }
    })
};


// edit form button event
// when the form is submitted (with a new animal edit), the below runs
// jQuery("#editForm").submit(function(e){

//   // first, let's pull out all the values
//   // the name form field value
//   var title = jQuery("#edit-title").val();
//   var text = jQuery("#edit-text").val();
//   var tags = jQuery("#edit-tags").val();
//   var url = jQuery("#edit-url").val();
//   var id = jQuery("#edit-id").val();

//     // make sure we have a location
//   console.log(id);  
//     // POST the data from above to our API create route
//     jQuery.ajax({
//       url : '/api/update/trail/'+id,
//       dataType : 'json',
//       type : 'POST',
//       // we send the data in a data object (with key/value pairs)
//       data : {
//           title: title,
//           text: text,
//           tags: tags,
//           url: url
//       },
//       success : function(response){
//           if(response.status=="OK"){
//               // success
//               console.log(response);
//               // re-render the map
//               renderTrailMap();
//               // now, close the modal
//               $('#editModal').modal('hide')
//               // now, clear the input fields
//               jQuery("#editForm input").val('');
//           }
//           else {
//               alert("something went wrong");
//           }
//       },
//       error : function(err){
//           // do error checking
//           alert("something went wrong");
//           console.error(err);
//       }
//     }); 

//     // prevents the form from submitting normally
//   e.preventDefault();
//   return false;
// });

// jQuery('#editModal').on('show.bs.modal', function (e) {
//   // let's get access to what we just clicked on
//   var clickedButton = e.relatedTarget;
//   // now let's get its parent
//     var parent = jQuery(clickedButton).parent();

//   // now, let's get the values of the pet that we're wanting to edit
//   // we do this by targeting specific spans within the parent and pulling out the text
//   var title = $(parent).find('.title').text();
//   var text = $(parent).find('.text').text();
//   // var note = $(parent).find('.note').text();
//   var tags = $(parent).find('.tags').text();
//   var url = $(parent).find('.url').attr('src');
//   // var location = $(parent).find('.location').text();
//   var id = $(parent).find('.id').text();

//   // now let's set the value of the edit fields to those values
//     jQuery("#edit-title").val(title);
//     jQuery("#edit-text").val(text);
//     // jQuery("#edit-note").val(note);
//     jQuery("#edit-tags").val(tags);
//     jQuery("#edit-url").val(url);
//     // jQuery("#edit-location").val(location);
//     jQuery("#edit-id").val(id);

// })


function deleteStep(event){
    var targetedId = event.target.id;
    console.log('the trail to delete is ' + targetedId);

    // now, let's call the delete route with AJAX
    jQuery.ajax({
        url : '/api/delete/trail/'+targetedId,
        dataType : 'json',
        success : function(response) {
            // now, let's re-render the steps

            renderTrailMap();

        }
    })

    event.preventDefault();
}