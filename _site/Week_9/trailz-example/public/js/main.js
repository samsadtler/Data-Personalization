// CUSTOM JS FILE //

function init() {
  renderPeeps();
}

function renderPeeps(){
	jQuery.ajax({
		url : '/api/get-all',
		dataType : 'json',
		success : function(response) {
			console.log(response);

			var trail = response.trail;

			for(var i=0;i<trail.length;i++){
				var htmlToAdd = '<div class="col-md-4">'+
					'<img src='+trail[i].imageUrl+' width="100">'+
					'<h1>'+trail[i].name+'</h1>'+
				'</div>';
			
				jQuery("#trail-holder").append(htmlToAdd);
			}



		}
	})	
}


window.addEventListener('load', init())