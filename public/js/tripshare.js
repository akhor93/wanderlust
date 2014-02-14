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
	var tripID = $(this).closest('.social_bar').find('.trip_id').html();
	console.log("Trip id: " + tripID);
	var url = "/index/" + tripID;
	$.get(url, incrementLikes);
}

function incrementLikes(numLikes) {
	console.log("Num likes passed from data: " + numLikes);

}

function favButtonClicked(e) {

}