$(document).ready( function() {
	$('.form_submit').submit( function(event){
		var tags = $(this).find("input[name='Find']").val();
		tags = tags.replace(/\s+/g, '');
		console.log(tags);

		hashGrab(tags);

		$("img").attr('src', '');
		$("input[name='Find']").val('');
	});
});

var showError = function(error){
	var errorText = '<p>your keyword was not found</p>';
	errorText.appendTo("#photos");
};
var hashGrab = function (tags) {

	$.ajax({
	type: "GET",
	dataType: "jsonp",
	url: "https://api.instagram.com/v1/tags/" + tags + "/media/recent?client_id=3acb27e236ad40d59bf2a83ae1bb9771"
	})
	.done(function(response) {
    	var limit = 20;
    	if(limit > 0) {
      		for(var i = 0; i < limit; i++) {
        		$('.image_' + i).attr("src", response.data[i].images.standard_resolution.url);
      		}
    	}
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('#photos').append(errorElem);
	});
};