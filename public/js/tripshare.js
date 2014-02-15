'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	initializeListeners();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript Connected");
	$('.jcarousel').jcarousel('scroll', 2);
	$('.like-button').click(likeButtonClicked);
	$('.fav-button').click(favButtonClicked);
}

function initializeListeners() {
	$('.trigger').click(function(event) {
		event.preventDefault();
	});
}

function likeButtonClicked(e) {
	e.preventDefault();
	console.log("like button clicked");
	//get the trip ID
	var tripID = $(this).closest('.social_bar').find('.trip_id').attr('id');
	console.log("Trip id: " + tripID);
	var url = "/index/" + tripID;
	$.get(url, incrementLikes);
}

function incrementLikes(data) {
	console.log("Num likes passed from data: " + data['num_likes']);
	var id = ".trip_id" + "#" + data['trip_id'];
	console.log(id);
	console.log($(id));
	console.log($(id).next().closest(".social_num").html());
	$(id).next().closest(".social_num").html(data['num_likes']);
}

function favButtonClicked(e) {

}