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
}

function initializeListeners() {
	$('.trigger').click(function(event) {
		event.preventDefault();
	});
}