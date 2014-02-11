$(document).ready(function(){

	var sc = new SignupController();
	$('#signout_link').click(function(event) {
		event.preventDefault();
		sc.attemptLogout();
	});

})