function SignupController()
{
	this.attemptLogout = function() {
		$.ajax({
			url: "/signout",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			location.reload();
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}
}