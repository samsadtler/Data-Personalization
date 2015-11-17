//------------------DOC READY-------------------//
var site;
var port = chrome.runtime.connect({name: "trailpath"});

$(document).ready(function(){
    var host = window.location.hostname;
    var pageBody = $(document.body);
    var pageURL = window.location.href;   
    console.log("pageURL =" + pageURL) 
    console.log('hostname -->' + host)
    $('<div class="sidebar-holder row"> Hello '+ pageURL +' World </div>').prependTo(pageBody)
    var htmlToAdd = 
        '<div class="col-md-4 trail">'+
            '<h1 class="title">'+host+'</h1>'+
            '<div id="trail-holder">'+

            '</div>'+
            '<div id="step-holder"></div>'+
            '<button type="button" id="display-trail">Display Trail</button>'+
            '<button type="button" id="add-trail">Add Trail</button>'+
        '</div>';

    jQuery('.sidebar-holder').prepend(htmlToAdd);

});

$('body').on('click', '#display-trail', function(e){
    displayTrail();
});
$('body').on('click', '#add-trail', function(e){
    console.log('submitting once');
    var pageURL = window.location.href; 
    var host = window.location.hostname;
    // first, let's pull out all the values
    // the name form field value
    // var trailTitle = jQuery("#trailTitle").val();
    // var title = jQuery("#title").val();
    // var tags = jQuery("#tags").val();
    // var text = jQuery("#text").val();
    // var url = jQuery("#url").val();
    var data = {
        trailTitle: "First Trail",
        title: host,
        text: "text",
        url: pageURL,
        tags: "tags"
    };

    console.log("Object to be created in the DB = " + JSON.stringify(data));
      // prevents the form from submitting normally
      e.preventDefault();
      addTrail(data);
      return false;
});

function addTrail(data){
    port.postMessage({"trail": "add trail", "data": data});
    port.onMessage.addListener(function(msg) {
        if (msg.status == "Ok"){
            console.log ("status returned success on posting to server");
            port.postMessage(
                {request: "thanks"}
                );
            console.log("in content");
        }
      else if (msg.question == "Madame who?")
        port.postMessage({"answer": "Madame... Bovary"});
    });
}

function displayTrail(){
        port.postMessage({"display": "display trail"});
        port.onMessage.addListener(function(msg) {
            if (msg.status == "Ok"){
                console.log ("status returned success on returned to server");
                console.log ("now render msg.response --> "+ msg.res);
                renderTrail(msg.res);
            }
          else if (msg.question == "Madame who?")
            port.postMessage({"answer": "Madame... Bovary"});
        });
}



function renderSteps(steps){

    // first, make sure the #animal-holder is empty
    jQuery('#step-holder').empty();

    // loop through all the steps and add them in the animal-holder div
    for(var i=0;i<steps.length;i++){
        var htmlToAdd = '<div class="col-md-4 step">'+
            '<h1 class="title">'+steps[i].title+'</h1>'+
            '<ul>'+
                '<li>Saved Text: <span class="text">'+steps[i].text+'</span></li>'+
                '<li>URL: <span class="note">'+steps[i].url+'</span></li>'+
                '<li>Tags: <span class="tags">'+steps[i].tags+'</span></li>'+
                '<li class="hide id">'+steps[i]._id+'</li>'+
            '</ul>'+
            '<button type="button" id="'+steps[i]._id+'" onclick="deleteStep(event)">Delete Step</button>'+
            '<button type="button" data-toggle="modal" data-target="#editModal"">Edit Step</button>'+
        '</div>';

        jQuery('#step-holder').prepend(htmlToAdd);

    }
}

//after the display function has been called render the response from the background script to the page
function renderTrail(trails){

    // first, make sure the #animal-holder is empty
    jQuery('#trail-holder').empty();

    // loop through all the steps and add them in the animal-holder div
    for(var i=0;i<trails.length;i++){

        var stepsInTrail = '';
        for(var j=0;j<trails[i].steps.length;j++){
            stepsInTrail += 
            '<ul>'+
                '<li><span class="step-title">'+trails[i].steps[j].title+'</span></li>'+
                '<li>Saved Text: <span class="text">'+trails[i].steps[j].text+'</span></li>'+
                '<li>URL: <span class="url">'+trails[i].steps[j].url+'</span></li>'+
                '<li>Tags: <span class="tags">'+trails[i].steps[j].tags+'</span></li>'+
                '<li class="hide id">'+trails[i].steps[j]._id+'</li>'+
            '</ul>';
        }

        var htmlToAdd = '<div class="col-md-4 trail">'+
            '<h1 class="title">'+trails[i].title+'</h1>'+
            stepsInTrail +
            '<button type="button" id="'+trails[i]._id+'" onclick="addStep(event)">Add Step</button>'+
            '<button type="button" id="'+trails[i]._id+'" onclick="deleteStep(event)">Delete Trail</button>'+
            '<button type="button" data-toggle="modal" data-target="#editModal"">Edit Step</button>'+
        '</div>';

        jQuery('#trail-holder').prepend(htmlToAdd);

    }
}


function saveText(e){
    console.log('this is where you save some text')
    e.preventDefault();

}


