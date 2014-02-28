'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	initializeListeners();

	//Move later. For single trip view
	$('#add_comment_ta').focus(function() {
		$(this).val('');
	});
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

function updateFollowers(userFollowed) {
	console.log("got here");
	$('#user_' + userFollowed + ' .all_follow_buttons').html("Following");
	$('#user_' + userFollowed + ' .all_follow_buttons').addClass("follow_button");
}

$('.follow_button').click(function() {
	console.log("follow button clicked!");
	var userID = $(this).attr("userID"); //user to follow
	console.log("user to follow: " + userID);
	var data = {
	  "userID": userID
	};
	var options = {
	  type: "POST",
	  url: "/follow",
	  data: data
	};
	$.ajax(options)
	  .done(function(data) { //data sent by res.send, not the data in options
	    updateFollowers(data);
	  })
	  .fail(function(msg) {
	    console.log(msg.responseText);
	  });
});
